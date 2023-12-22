import React, { Fragment, useState } from 'react'
import './Realestate.scss'


import bus from '../../assets/busTrain.jpg'
import muzzafar from '../../assets/Muzaffarabad.jpg'
import hotel from '../../assets/master-bed-executive.jpg'

import nann from '../../assets/plain-naan-bread-chana.jpg'
import bridge from '../../assets/Sharda_Bridge,neelam_vellay18apr17.jpg'
import gazi from '../../assets/Nawaz-Park-Wikipedia.png'
import pulao from '../../assets/pulao.jpg'
import boat from '../../assets/1365606-image-1490468772.jpg'
import tikka from '../../assets/download.jpg'

import paratha from '../../assets/Untitled-17-2.webp'
import neelum from '../../assets/neelum.jpg'
import rati from '../../assets/rattigali.jpg'
import kel from '../../assets/Arankel_Kel_Village.jpg'
import lake from '../../assets/lake.jpg'
import ruins from '../../assets/sharda2.jpg'
import dhani from '../../assets/Dhani-Waterfall.jpg'
import kuri from '../../assets/two-whole-fish-grilling-over-a-winter-barbecue-outdoors-in-fresh-white-snow-with-a-gloved-hand-turning-them-over-the-coals-RCJYC5.jpg'
import wazwan from '../../assets/appetizing-pieces-of-grilled-fish-and-meat-cooked-on-the-grill-over-M52RCC.jpg'


import market from '../../assets/local.jpg'
import shawl from '../../assets/shawl.jpeg'
import trout from '../../assets/kabab monday dinner.jpg'
import scene from '../../assets/Pir-Chinasi-Muzaffarabd-scaled.jpg'
import mark from '../../assets/localmar.jpg'
import kabab from '../../assets/kabab.jpg'
import lahore from '../../assets/maxresdefault.jpg'
import ticket from '../../assets/photo-1473625247510-8ceb1760943f.jpg'
import paratha2 from '../../assets/desi-nashta-parathaandhachai-recipe-main-photo.jpg'
import profile from '../../assets/profile.jpg'
import cofee from '../../assets/coffeee.jpg'


import kutton from '../../assets/Kutton_Waterfall_travelpakistani.jpg'
import upper from '../../assets/Keran-Upper-Neelum-Azad-Kashmir-at-Pakistan-India-Line-of-Control.jpg'
import aranf from '../../assets/arangkel.jpg'
import per from '../../assets/pir.jpg'
import Sidebar from './Menu';

const Realestate = () => {



  const itinerary = [
    {
      key: '0',
      title: "Friday, December 22nd (Lahore to Muzaffarabad)",
      events: [
        { time: "9:00 PM", activity: "Depart from Lahore by bus. Enjoy the overnight journey with snacks and beverages of your choice.", img: bus },

      ]
    },
    {
      key: '1',
      title: "Saturday, December 23rd (Muzaffarabad & Neelum Valley)",
      events: [
        { time: "7:00 AM (Saturday)", activity: "Arrive in Muzaffarabad and freshen up at your hotel.", img: muzzafar, img2: hotel },
        { time: "8:00 AM", activity: "Refuel with a hearty breakfast of naan and chana masala at a local cafe.", img: nann },
        { activity: "Explore the vibrant city. Walk across the iconic Shahdra Bridge and visit the Pir Ghazi Park for some greenery and fresh air.", img: bridge, },
        { activity: "Explore the nature in the Keran Upper", img2: upper },
        { activity: "Embark on a relaxing Neelum River boat ride, surrounded by breathtaking mountains and fresh mountain air. Capture panoramic photos and soak in the tranquility.", img: boat },
        { time: "5:00 PM", activity: "Treat yourself to a farewell dinner with a view! Indulge in mouthwatering chicken tikka masala and fluffy naan, complemented by hot chaye or coffee.", img: tikka }
        , { activity: "", img: cofee },

      ]
    },
    {
      key: '2',
      title: "Sunday, December 24th (Neelum Valley & Dhani Waterfall)",
      events: [
        { time: "8:00 AM", activity: "Start your day with a warm anda paratha breakfast at your hotel.", img: paratha },
        { activity: "Hit the road for a scenic drive to the Neelum Valley, stopping at picturesque Ratti Gali for breathtaking mountain panoramas.", img: neelum, img2: rati },
        { activity: "Arrive in the charming village of Kel. Enjoy a picnic lunch by the turquoise waters of Sharda Lake, surrounded by majestic peaks.", img: kel, img2: lake },
        { activity: "Take a short hike to the UNESCO World Heritage Site, Sharda University ruins, and explore its ancient Buddhist history.", img: ruins },
        { activity: "Feel the refreshing spray and capture stunning photos in Arang Kel.", img: aranf, },
        { activity: "Hike to the mesmerizing Kutton Waterfall, cascading down a steep mountainside. Feel the refreshing spray and capture stunning photos.", img: kutton, },
        { activity: "Savor a traditional Kashmiri dinner of Gushtaba (meatball curry in yogurt) or Kashmiri Wazwan (multi-course feast), enjoying local flavors and warmth.", img: kuri, img2: wazwan }
      ]
    },
    {
      key: '3',
      title: "Monday, December 25th (Dhani Waterfall)",
      events: [
        { time: "8:00 AM", activity: "Start your day with another anda paratha breakfast for energy.", img: paratha2 },
        { activity: "Visit and explore the local markets in Kel for unique souvenirs like handcrafted shawls or wooden artifacts.", img2: market, img3: shawl },
        { activity: "Explore the local markets in Muzaffarabad, picking up any souvenirs you missed.", img: mark },
        { activity: "Take a scenic drive back to Muzaffarabad, stopping at picturesque points for last-minute photos.", img: scene },
       
        { time: "7:00 PM", activity: "Bid farewell to Kashmir with a final dinner of chicken and beef kebabs, grilled to perfection and bursting with flavor.", img: trout },
        { activity: "", img: cofee },
      ]
    },
    {
      key: '4',
      title: "Tuesday, December 26th (Arrival in Lahore)",
      events: [
        { activity: "Visit and explore the beautiful view of Pir Chenasi", img2: per },

        { activity: "Board the bus back to Lahore.", img: ticket },
        { time: "Estimated Arrival in Lahore", activity: "Late afternoon/evening.", img: lahore }
      ]
    }
  ];
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (item) => {
    setExpandedItem((prevItem) => (prevItem === item ? null : item));
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const items = ['Departure', 'Day 1', 'Day 2', 'Day 3', 'Day 4'];

  return (
    <div style={{overflow : ""}}>
      <Sidebar />

      <div className="expandable-list" >
        <ul>
          {items.map((item, ind) => (
            <li
              key={ind}
              className={`list-item ${expandedItem === item ? 'expanded' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item}
              {expandedItem === item && (
                <div className="main_tour" style={{ overflow: "auto" }}>
                  {ind === 0 &&
                    <div className="Tour_title">
                      Date Of Departure
                    </div>
                  }
                  <div className="tour_content" >
                    {itinerary.filter((days) => { return days.key == ind }).map((e, index) => {
                      console.log('eeeeeeee', e);
                      return (
                        <>
                          <div className="tour" key={index}  >
                            <div className="title">{e.title}</div>
                            {e.events.map((f, ind) => {
                              return (
                                <>
                                  <div className="event" key={ind}>
                                    {f.time && (

                                      <div className="time">
                                        {f.time}
                                      </div>
                                    )}
                                    {f.img && (
                                      <div className="pic">
                                        <img src={f.img} />
                                      </div>
                                    )}
                                    {f.img2 && (
                                      <div className="pic">
                                        <img src={f.img2} />
                                      </div>
                                    )}
                                    {f.img3 && (
                                      <div className="pic">
                                        <img src={f.img3} />
                                      </div>
                                    )}
                                    <div className="des">{f.activity}</div>
                                  </div>
                                </>
                              )
                            })}

                          </div>
                        </>
                      )
                    })}
                  </div>
                  <p> {item}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='main_tour' style={{ overflow: "auto" }}>


        <div className="bonus_title">
          Bonus Tips
        </div>

        <ul className='main_list'>
          <li>Pack warm clothes and waterproof gear for cold weather and potential snow.</li>
          <li>Check weather conditions and road closures before heading out.</li>
          <li>Consider attending the Shandur Polo Festival in December (check dates) for a unique cultural experience.</li>
          <li>Enjoy the local hospitality and immerse yourself in the rich Kashmiri culture.</li>
        </ul>

        <div className="note_main">

          <div className="note">Note</div>
          <div className="note_des">
            Remember, this is just a suggested itinerary. Feel free to adjust it based on your interests and preferences!
          </div>
        </div>


        <div className="care">
          I hope this revised itinerary with Friday night departure and additional details helps you plan your exciting adventure in Azad Kashmir! Have a wonderful trip!
        </div>

      </div>
    </div>

  )
}

export default Realestate
