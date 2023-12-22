from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt, get_jwt_identity
import secrets
import pandas as pd
import urllib.request
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = secrets.token_hex(16)
jwt = JWTManager(app)

revoked_tokens = set()


def sendResponse(data=None, message="", success=True, status=200):
    response = {
        "success": success,
        "message": message,
        "result": data
    }
    return jsonify(response), status

# User login


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    is_authenticated = False
    path = 'https://www.dropbox.com/s/3kw7hhgq17auwlg/users.csv?dl=1'
    reader = pd.read_csv(urllib.request.urlopen(path))

    for i in range(len(reader)):
        if reader['username'].iloc[i] == username and reader['password'].iloc[i] == password:
            is_authenticated = True
            access_token = create_access_token(identity=username)

            return sendResponse({"isAuthenticated": is_authenticated, "accessToken": access_token}, "Login Successful", True, 200)
    return sendResponse({"isAuthenticated": is_authenticated}, "Invalid username or password", False, 400)

# Logout


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()['jti']
    revoked_tokens.add(jti)

    return sendResponse(None, "Logged out successfully", True, 200)

# Homepage Graphs


@app.route('/', methods=['GET'])
# @jwt_required()
def index():
    path = 'https://www.dropbox.com/s/294dwhvb9gqq1lm/us-nz.csv?dl=1'
    df_bonds = pd.read_csv(urllib.request.urlopen(path))
    # print(df_bonds)
    headers = df_bonds.columns.to_list()
    #     for i in range(len(df_bonds.columns)):
    #         headers[i] = f'{headers[i]}' + f' - {df_bonds.iloc[0,i]}'
    headers[0] = 'Period'
    df_bonds.columns = headers
    for i in range(len(df_bonds)):
        df_bonds['Period'].iloc[i] = f"{df_bonds['Period'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    # df_bonds['Period'] = pd.to_datetime(df_bonds['Period']).astype(str)
    df_bonds.set_index('Period', inplace=True)
    for i in range(len(df_bonds)):
        df_bonds.iloc[i] = pd.to_numeric(df_bonds.iloc[i], errors='coerce')
    df_bonds.drop(['OCR', '2 Mo', '6 Mo', '3 Yr', '7 Yr',
                  '20 Yr', '30 Yr'], inplace=True)
    # graphJSON6 = json.dumps(df_bonds.to_dict())

    # current_user = get_jwt_identity()
    path = f'https://www.dropbox.com/s/bjvhtqyvbuvmajf/market_cap_rates.csv?dl=1'
    df_cr = pd.read_csv(urllib.request.urlopen(path))
    headers = df_cr.columns.to_list()
    headers[0] = 'Date'
    df_cr.columns = headers
    df_cr.Date = pd.to_datetime(df_cr.Date, dayfirst=True)
    df_cr.set_index(df_cr.Date, inplace=True)
    df_cr.drop('Date', axis=1, inplace=True)
    for i in range(len(df_cr)):
        df_cr.iloc[i] = df_cr.iloc[i].str.rstrip("%").astype(float)/100
    df_cr.dropna(how='all', inplace=True)
    averages = []
    for i in range(len(df_cr)):
        averages.append(round(df_cr.iloc[i].mean(), 4))
    df_cr['Average'] = averages
    for i in range(len(df_cr.columns)):
        df_cr.iloc[:, i] = pd.to_numeric(df_cr.iloc[:, i], errors='coerce')
    df_cr = df_cr.loc[df_cr.index > '2004-06-30', :]

    return sendResponse({
        "interestRate": df_bonds.to_dict(orient='records'),
        "marketCapRates": df_cr.to_dict(orient='records')
    }, "Homepage Graphs", True, 200)

# Real Estate Graphs
@app.route('/real-estate', methods=['GET'])
# @jwt_required()
def realestate():
    print("Hited")
    # current_user = get_jwt_identity()
    path = 'https://www.dropbox.com/s/9ywfkmduiqwn5ck/sale_prices.csv?dl=1'
    df_sale_prices = pd.read_csv(urllib.request.urlopen(path))
    df_sale_prices['Period'] = pd.to_datetime(
        df_sale_prices['Period']).astype(str)
    df_sale_prices.set_index('Period', inplace=True)
    for i in range(len(df_sale_prices)):
        df_sale_prices.iloc[i] = pd.to_numeric(
            df_sale_prices.iloc[i], errors='coerce')

    path = 'https://www.dropbox.com/s/o800sz6al2977id/days_to_sell.csv?dl=1'
    df_days_to_sell = pd.read_csv(urllib.request.urlopen(path))
    df_days_to_sell['Period'] = pd.to_datetime(
        df_days_to_sell['Period']).astype(str)
    df_days_to_sell.set_index('Period', inplace=True)
    for i in range(len(df_days_to_sell)):
        df_days_to_sell.iloc[i] = pd.to_numeric(
            df_days_to_sell.iloc[i], errors='coerce')

    path = 'https://www.dropbox.com/s/4g5y910hjaqk1y2/no_sales.csv?dl=1'
    df_no_sales = pd.read_csv(urllib.request.urlopen(path))
    df_no_sales['Period'] = pd.to_datetime(df_no_sales['Period']).astype(str)
    df_no_sales.set_index('Period', inplace=True)
    for i in range(len(df_no_sales)):
        df_no_sales.iloc[i] = pd.to_numeric(
            df_no_sales.iloc[i], errors='coerce')

    path = 'https://www.dropbox.com/s/3wnoiyp2ikx586d/CBRE_Yields_-_Auckland.csv?dl=1'
    df_cbre = pd.read_csv(urllib.request.urlopen(path))
    df_cbre['Date'] = pd.to_datetime(df_cbre['Date'], dayfirst=True)
    df_cbre.set_index('Date', inplace=True)
    for i in range(len(df_cbre)):
        df_cbre.iloc[i] = pd.to_numeric(df_cbre.iloc[i], errors='coerce')
    df_yields_akl = df_cbre.iloc[:, 0:3]
    df_rent_akl = df_cbre.iloc[:, [3, 5, 7]]
    df_rent_akl.columns = ['Auckland Prime Office Rent',
                           'Auckland Industrial Rent', 'Auckland Bulk Retail Rent']
    path = f'https://www.dropbox.com/s/8512bfznjd5yyxc/CBRE_Yields_-_Wellington.csv?dl=1'
    df_cbre = pd.read_csv(urllib.request.urlopen(path))
    df_cbre['Date'] = pd.to_datetime(df_cbre['Date'], dayfirst=True)
    df_cbre.set_index('Date', inplace=True)
    for i in range(len(df_cbre)):
        df_cbre.iloc[i] = pd.to_numeric(df_cbre.iloc[i], errors='coerce')
    df_yields_wel = df_cbre.iloc[:, 0:2]
    df_rent_wel = df_cbre.iloc[:, [2, 4]]
    df_rent_wel.columns = ['Wellington CBD Office Rent',
                           'Wellington Industrial Rent']
    df_yields = pd.concat([df_yields_akl, df_yields_wel], axis=1)
    df_rent = pd.concat([df_rent_akl, df_rent_wel], axis=1)
    df_rent['Wellington Industrial Rent'] = df_rent['Wellington Industrial Rent'].astype(
        float)
    df_rent = df_rent.loc[df_rent.index > '2000']

    path = f'https://www.dropbox.com/s/m7l6imdjs7z19ir/New_Number.csv?dl=1'
    df_consents = pd.read_csv(urllib.request.urlopen(path))
    df_consents.iloc[0, 0] = 'Date'
    header = df_consents.columns.to_list()
    for i in range(len(df_consents.columns)):
        header[i] = f"{header[i]} - {df_consents.iloc[0,i]} - {df_consents.iloc[1,i]} - {df_consents.iloc[2,i]} - {df_consents.iloc[3,i]}"
    header[0] = 'Date'
    df_consents.columns = header
    df_consents.drop([0, 1, 2, 3], inplace=True)
    for i in range(len(df_consents)):
        df_consents.Date.iloc[i] = df_consents.Date.iloc[i].replace("M", " ")
        df_consents.Date.iloc[i] = datetime.strptime(
            df_consents.Date.iloc[i], "%Y %m")
    df_consents.set_index(df_consents.columns[0], inplace=True)
    df_consents.index = df_consents.index.to_period('M').to_timestamp('M')
    for i in range(len(df_consents.values)):
        for j in range(len(df_consents.columns)):
            df_consents.values[i][j] = int(
                df_consents.values[i][j].replace(',', ''))
    path = f'https://www.dropbox.com/s/kr4rfxmti48c7wf/by_region.csv?dl=1'
    df_pop = pd.read_csv(urllib.request.urlopen(path))
    header = df_pop.columns
    header = header.to_list()
    header[0] = 'Year'
    df_pop.columns = header
    df_pop.set_index('Year', inplace=True)
    df_pop.index = pd.to_datetime(df_pop.index, format="%Y").year
    for i in range(len(df_pop.values)):
        for j in range(len(df_pop.columns)):
            df_pop.values[i][j] = int(df_pop.values[i][j].replace(',', ''))
    df_consents_pc = df_consents[f'{df_pop.index.values[0]}':f'{df_pop.index.values[-1]}']
    areas = df_consents_pc.columns.to_list()
    for area in areas:
        for i in df_pop.index:
            for j in range(len(df_consents_pc.loc[f'{i}', f'{area}'])):
                if "Auckland" in area:
                    df_consents_pc.loc[f'{i}', f'{area}'].iloc[j] = df_consents_pc.loc[f'{i}',
                                                                                       f'{area}'].iloc[j] / int(df_pop.loc[i, 'Auckland Region'])
                elif "Bay of Plenty" in area:
                    df_consents_pc.loc[f'{i}', f'{area}'].iloc[j] = df_consents_pc.loc[f'{i}',
                                                                                       f'{area}'].iloc[j] / int(df_pop.loc[i, 'Bay of Plenty Region'])
                elif "Wellington" in area:
                    df_consents_pc.loc[f'{i}', f'{area}'].iloc[j] = df_consents_pc.loc[f'{i}',
                                                                                       f'{area}'].iloc[j] / int(df_pop.loc[i, 'Wellington Region'])
                elif "NZ" in area:
                    df_consents_pc.loc[f'{i}', f'{area}'].iloc[j] = df_consents_pc.loc[f'{i}',
                                                                                       f'{area}'].iloc[j] / int(df_pop.loc[i, 'New Zealand'])
    key_words = ['Auckland', 'Wellington', 'Bay of Plenty', 'All buildings']
    selection = [col for col in df_consents_pc.columns if (((key_words[0] in col) | (
        key_words[1] in col) | (key_words[2] in col)) & (key_words[3] in col))]
    df_consents_pc_comp = df_consents_pc.drop(
        columns=[col for col in df_consents_pc if col not in selection])
    df_consents_pc_comp.columns = ['Auckland', 'Bay of Plenty', 'Wellington']

    return sendResponse({
        "medianSalesPrice": df_sale_prices.to_dict(orient='records'),
        "daysToSell": df_days_to_sell.to_dict(orient='records'),
        "noOfSales": df_no_sales.to_dict(orient='records'),
        "unlistedCapsRated": df_yields.to_dict(orient='records'),
        "unlistedMedainRent": df_rent.to_dict(orient='records'),
        "constantsPerCapita": df_consents_pc_comp.to_dict(orient='records')
    }, "Real Estate Graphs", True, 200)

# Listed Property Graphs


@app.route('/listed-property', methods=['GET'])
@jwt_required()
def listedProperty():
    path = 'https://www.dropbox.com/s/u5n8mw0sbzpefa8/prices_all.csv?dl=1'
    df_prices = pd.read_csv(urllib.request.urlopen(path))
    df_prices['Date'] = pd.to_datetime(df_prices['Date'], dayfirst=True)
    df_prices.set_index('Date', inplace=True)
    for i in range(len(df_prices)):
        df_prices.iloc[i] = pd.to_numeric(df_prices.iloc[i], errors='coerce')

    path = f'https://www.dropbox.com/s/jbeyctibvylv1ym/price%26NTA.csv?dl=1'
    df_ave_comp = pd.read_csv(urllib.request.urlopen(path))
    df_ave_comp['Date'] = pd.to_datetime(df_ave_comp['Date'], dayfirst=True)
    df_ave_comp.set_index('Date', inplace=True)
    for i in range(len(df_ave_comp)):
        df_ave_comp.iloc[i] = pd.to_numeric(
            df_ave_comp.iloc[i], errors='coerce')

    path = f'https://www.dropbox.com/s/3u753huxjiiqj4a/price-NTA.csv?dl=1'
    df_p2nta = pd.read_csv(urllib.request.urlopen(path))
    df_p2nta.Date = pd.to_datetime(df_p2nta.Date, dayfirst=True)
    # res = df_p2nta[~(df_p2nta.Date >= '2019-08-19')]
    df_p2nta.set_index('Date', inplace=True)
    df_p2nta = df_p2nta.drop_duplicates(keep=False)
    df_p2nta = df_p2nta.subtract(1)
    # df_p2nta = pd.concat([res,df_p2nta.resample('M').last()])
    # df_p2nta.drop(['Average','AUG'],axis=1,inplace=True)
    df_p2nta = df_p2nta.loc[df_p2nta.index > '2000-08-21', :]
    averages = []
    for i in range(len(df_p2nta)):
        averages.append(round(df_p2nta.iloc[i].mean(), 4))
    df_p2nta['Average'] = averages

    path = f'https://www.dropbox.com/s/bjvhtqyvbuvmajf/market_cap_rates.csv?dl=1'
    df_cr = pd.read_csv(urllib.request.urlopen(path))
    headers = df_cr.columns.to_list()
    headers[0] = 'Date'
    df_cr.columns = headers
    df_cr.Date = pd.to_datetime(df_cr.Date, dayfirst=True)
    df_cr.set_index(df_cr.Date, inplace=True)
    df_cr.drop('Date', axis=1, inplace=True)
    for i in range(len(df_cr)):
        df_cr.iloc[i] = df_cr.iloc[i].str.rstrip("%").astype(float)/100
    df_cr.dropna(how='all', inplace=True)
    averages = []
    for i in range(len(df_cr)):
        averages.append(round(df_cr.iloc[i].mean(), 4))
    df_cr['Average'] = averages
    for i in range(len(df_cr.columns)):
        df_cr.iloc[:, i] = pd.to_numeric(df_cr.iloc[:, i], errors='coerce')
    df_cr = df_cr.loc[df_cr.index > '2004-06-30', :]

    path = f'https://www.dropbox.com/s/dl577ukggwd6942/cash_yields.csv?dl=1'
    df_cy = pd.read_csv(urllib.request.urlopen(path))
    df_cy.Date = pd.to_datetime(df_cy.Date, dayfirst=True)
    df_cy.set_index('Date', inplace=True)
    for i in range(len(df_cy)):
        df_cy.iloc[i] = df_cy.iloc[i].str.rstrip("%").astype(float)/100
    for i in range(len(df_cy.columns)):
        df_cy.iloc[:, i] = pd.to_numeric(df_cy.iloc[:, i], errors='coerce')
    df_cy = df_cy.loc[df_cy.index > '2004-09-30']

    return sendResponse({
        "stockPriceAdjustedClose": df_prices.to_dict(orient='records'),
        "avgPriceNTA": df_ave_comp.to_dict(orient='records'),
        "priceNTA": df_p2nta.to_dict(orient='records'),
        "listedMarketCapRates": df_cr.to_dict(orient='records'),
        "dividendYield": df_cy.to_dict(orient='records')
    }, "Listed Property Graphs", True, 200)

# Economic Graphs


@app.route('/economic', methods=['GET'])
@jwt_required()
def economic():
    path = f'https://www.dropbox.com/s/1niwjs7k3ujlp5z/b2_pre2018.csv?dl=1'
    df_wholesale = pd.read_csv(urllib.request.urlopen(path))
    # df_wholesale.pop(df_wholesale.columns[0])
    headers = df_wholesale.columns.to_list()
    for i in range(len(df_wholesale.columns)):
        headers[i] = f'{headers[i]}' + f' - {df_wholesale.iloc[0,i]}'
    headers[0] = 'Date'
    df_wholesale.columns = headers
    df_wholesale.drop([0, 1, 2, 3, 4], inplace=True)
    for i in range(len(df_wholesale)):
        df_wholesale['Date'].iloc[i] = f"{df_wholesale['Date'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    df_wholesale['Date'] = pd.to_datetime(df_wholesale['Date'], dayfirst=True)
    df_wholesale.set_index('Date', inplace=True)
    for i in range(len(df_wholesale)):
        df_wholesale.iloc[i] = pd.to_numeric(
            df_wholesale.iloc[i], errors='coerce')
    path = f'https://www.dropbox.com/s/t296uhetf0ogk8d/b2_post2018.csv?dl=1'
    df_wholesale_p = pd.read_csv(urllib.request.urlopen(path))
    # df_wholesale_p.pop(df_wholesale_p.columns[0])
    headers = df_wholesale_p.columns.to_list()
    for i in range(len(df_wholesale_p.columns)):
        headers[i] = f'{headers[i]}' + f' - {df_wholesale_p.iloc[0,i]}'
    headers[0] = 'Date'
    df_wholesale_p.columns = headers
    df_wholesale_p.drop([0, 1, 2, 3, 4], inplace=True)
    df_wholesale_p['Date'] = pd.to_datetime(
        df_wholesale_p['Date'], dayfirst=True)
    df_wholesale_p.set_index('Date', inplace=True)
    for i in range(len(df_wholesale_p)):
        df_wholesale_p.iloc[i] = pd.to_numeric(
            df_wholesale_p.iloc[i], errors='coerce')
    df_wholesale = pd.concat([df_wholesale, df_wholesale_p])
    df_wholesale_tr = df_wholesale.iloc[50:, :9]
    df_wholesale_tr.columns = ['OCR', 'Overnight interbank cash rate',
                               '1 Mo', '2 Mo', '3 Mo', '1 Yr', '2 Yr', '5 Yr', '10 Yr']

    path = f'https://www.dropbox.com/s/1qu2rjtczqu365v/m5.csv?dl=1'
    df_gdp = pd.read_csv(urllib.request.urlopen(path))
    # df_gdp.pop(df_gdp.columns[0])
    # print(df_gdp)
    headers = df_gdp.columns.to_list()
    for i in range(len(df_gdp.columns)):
        headers[i] = f'{headers[i]}' + f' - {df_gdp.iloc[0,i]}'
    headers[0] = 'Date'
    df_gdp.columns = headers
    df_gdp.drop([0, 1, 2, 3], inplace=True)
    for i in range(len(df_gdp)):
        df_gdp['Date'].iloc[i] = f"{df_gdp['Date'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    df_gdp['Date'] = pd.to_datetime(df_gdp['Date'], dayfirst=True)
    df_gdp.set_index('Date', inplace=True)
    for i in range(len(df_gdp)):
        df_gdp.iloc[i] = pd.to_numeric(df_gdp.iloc[i], errors='coerce')
    key_words = ['$', 'Real', 's.a.']
    selection = [col for col in df_gdp.columns if ((key_words[0] in col) & (
        key_words[1] in col) & (key_words[2] in col))]  # &(key_words[3] in col)
    df_gdp_comp = df_gdp.drop(
        columns=[col for col in df_gdp if col not in selection])
    df_gdp_comp.columns = ['GDP - production based', 'GDP - expenditure based', 'Private final consumption expenditure', 'Gneral government final consumption expenditure',
                           'Change in inventories', 'Gross fixed capital formation - residential', 'Gross fixed capital formation - other', 'Gross national expenditure', 'Exports', 'Imports']

    path = f'https://www.dropbox.com/s/l7skpzes7bqlful/m6.csv?dl=1'
    df_nationalSaving = pd.read_csv(urllib.request.urlopen(path))
    # df_nationalSaving.pop(df_nationalSaving.columns[0])
    # print(df_nationalSaving)
    headers = df_nationalSaving.columns.to_list()
    for i in range(len(df_nationalSaving.columns)):
        headers[i] = f'{headers[i]}' + f' - {df_nationalSaving.iloc[0,i]}'
    headers[0] = 'Date'
    df_nationalSaving.columns = headers
    df_nationalSaving.drop([0, 1, 2, 3], inplace=True)
    for i in range(len(df_nationalSaving)):
        df_nationalSaving['Date'].iloc[i] = f"{df_nationalSaving['Date'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    df_nationalSaving['Date'] = pd.to_datetime(
        df_nationalSaving['Date'], dayfirst=True)
    df_nationalSaving.set_index('Date', inplace=True)
    for i in range(len(df_nationalSaving)):
        df_nationalSaving.iloc[i] = pd.to_numeric(
            df_nationalSaving.iloc[i], errors='coerce')
    key_words = ['Saving']
    # &(key_words[1] in col)&(key_words[2] in col)&(key_words[3] in col)
    selection = [col for col in df_nationalSaving.columns if (
        (key_words[0] in col))]
    df_nationalSaving_comp = df_nationalSaving.drop(
        columns=[col for col in df_nationalSaving if col not in selection])
    df_nationalSaving_comp.columns = ['National', 'Businesses', 'Financial intermediaries',
                                      'General government', 'Non-profit institutions serving households', 'Households', 'Household saving rate']

    path = f'https://www.dropbox.com/s/z1i5nkmsu12jcy1/m9.csv?dl=1'
    df_labour = pd.read_csv(urllib.request.urlopen(path))
    # df_labour.pop(df_labour.columns[0])
    # print(df_labour)
    headers = df_labour.columns.to_list()
    for i in range(len(df_labour.columns)):
        headers[i] = f'{headers[i]}' + f' - {df_labour.iloc[0,i]}'
    headers[0] = 'Date'
    df_labour.columns = headers
    df_labour.drop([0, 1, 2, 3], inplace=True)
    for i in range(len(df_labour)):
        df_labour['Date'].iloc[i] = f"{df_labour['Date'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    df_labour['Date'] = pd.to_datetime(df_labour['Date'], dayfirst=True)
    df_labour.set_index('Date', inplace=True)
    for i in range(len(df_labour)):
        df_labour.iloc[i] = pd.to_numeric(df_labour.iloc[i], errors='coerce')
    key_words = ['%', 'wages', 'hourly']
    selection = [col for col in df_labour.columns if ((key_words[0] in col) | (
        key_words[1] in col) | (key_words[2] in col))]  # &(key_words[3] in col)
    df_labour_comp = df_labour.drop(
        columns=[col for col in df_labour if col in selection])
    df_labour_comp.columns = ['Employed', 'Unemployed', 'Total',
                              'Not in labour force', 'Working-age population', 'Labour cost index (LCI)']

    path = f'https://www.dropbox.com/s/s7yk0qd1q4ddjs9/b20.csv?dl=1'
    df_resMortgageRates_sta = pd.read_csv(urllib.request.urlopen(path))
    # df_resMortgageRates_sta.pop(df_resMortgageRates_sta.columns[0])
    headers = df_resMortgageRates_sta.columns.to_list()
    for i in range(len(df_resMortgageRates_sta.columns)):
        headers[i] = f'{df_resMortgageRates_sta.iloc[0,i]}'
    headers[0] = 'Date'
    df_resMortgageRates_sta.columns = headers
    df_resMortgageRates_sta.drop([0, 1, 2, 3], inplace=True)
    for i in range(len(df_resMortgageRates_sta)):
        df_resMortgageRates_sta['Date'].iloc[i] = f"{df_resMortgageRates_sta['Date'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    df_resMortgageRates_sta['Date'] = pd.to_datetime(
        df_resMortgageRates_sta['Date'], dayfirst=True)
    df_resMortgageRates_sta.set_index('Date', inplace=True)
    for i in range(len(df_resMortgageRates_sta)):
        df_resMortgageRates_sta.iloc[i] = pd.to_numeric(
            df_resMortgageRates_sta.iloc[i], errors='coerce')

    path = f'https://www.dropbox.com/s/utyk6bhq8j2qomj/r1.csv?dl=1'
    df_r1 = pd.read_csv(urllib.request.urlopen(path))
    # df_r1.pop(df_r1.columns[0])
    # print(df_r1)
    headers = df_r1.columns.to_list()
    for i in range(len(df_r1.columns)):
        headers[i] = f'{headers[i]}' + f' - {df_r1.iloc[0,i]}'
    headers[0] = 'Date'
    df_r1.columns = headers
    df_r1.drop([0, 1, 2, 3], inplace=True)
    for i in range(len(df_r1)):
        df_r1['Date'].iloc[i] = f"{df_r1['Date'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    df_r1['Date'] = pd.to_datetime(df_r1['Date']).astype(str)
    df_r1.set_index('Date', inplace=True)
    for i in range(len(df_r1)):
        df_r1.iloc[i] = pd.to_numeric(df_r1.iloc[i], errors='coerce')
    df_r1.columns = ['Assets - Cash balances', 'Assets - Investments - Foreign currency', 'Assets - Investments - New Zealand government securities', 'Asets - Securities purchased under agreements to resell', 'Assets - Securities - LSAP programme', 'Assets - Crown indemnity for LSAP programme', 'Assets - Derivative assets', 'Assets - Other financial assets', 'Assets - Other assets', 'Assets - Total Assets', 'Assets memo item - New Zealand government securities',
                     'Liabilities - Deposits', 'Liabilities - Crown indemnity for LSAP programme', 'Liabilities - Term liabilities', 'Liabilities - Derivative liabilities', 'Liabilities - Securities sold under agreements to repurchase', 'Liabilities - Reserve Bank bills', 'Liabilities - Currency in circulation', 'Liabilities - Other financial liabilities', 'Liabilities - Other liabilities', 'Liabilities - Total liabilities', 'Net Assets/Equity', 'Total Liabilities and Net Assets/Equity']

    path = 'https://www.dropbox.com/s/294dwhvb9gqq1lm/us-nz.csv?dl=1'
    df_bonds = pd.read_csv(urllib.request.urlopen(path))
    # print(df_bonds)
    headers = df_bonds.columns.to_list()
    #     for i in range(len(df_bonds.columns)):
    #         headers[i] = f'{headers[i]}' + f' - {df_bonds.iloc[0,i]}'
    headers[0] = 'Period'
    df_bonds.columns = headers
    for i in range(len(df_bonds)):
        df_bonds['Period'].iloc[i] = f"{df_bonds['Period'].iloc[i]}".replace(
            ' 12:00:00 am', '')
    # df_bonds['Period'] = pd.to_datetime(df_bonds['Period']).astype(str)
    df_bonds.set_index('Period', inplace=True)
    for i in range(len(df_bonds)):
        df_bonds.iloc[i] = pd.to_numeric(df_bonds.iloc[i], errors='coerce')
    df_bonds.drop(['OCR', '2 Mo', '6 Mo', '3 Yr', '7 Yr',
                  '20 Yr', '30 Yr'], inplace=True)

    return sendResponse({
        "governmentNotes": df_wholesale_tr.to_dict(orient='records'),
        "GDPMeaures": df_gdp_comp.to_dict(orient='records'),
        "nationalSavings": df_nationalSaving_comp.to_dict(orient='records'),
        "labourForce": df_labour_comp.to_dict(orient='records'),
        "residentialMortgageRates": df_resMortgageRates_sta.to_dict(orient='records'),
        "RBNZBalanceSheet": df_r1.to_dict(orient='records'),
        "governmentBondYieldCurve": df_bonds.to_dict(orient='records')
    }, "Economic Graphs", True, 200)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

