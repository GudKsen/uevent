import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Header from "../../sidebar/Header";
import Sidebar2 from "../../sidebar/sidebar2";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/less';
import 'swiper/less/navigation';
import 'swiper/less/pagination';
import "./styleCreateEvent.scss";
import { FormMain } from './FormMain';
import { useRef } from 'react';
import SwiperCore, { EffectFade, Autoplay } from "swiper";
// import { LocationForm } from './LocationForm';s
import { useState } from 'react';
// import { PublishForm } from './PublishForm';
import axios from "axios";
import { FormLocPub } from './FormLocPub';
import { useNavigate } from 'react-router-dom';
SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);

interface ILocationOne {
    value: string;
    label: string;
}

function CreateEvent() {
    const navigate = useNavigate();
    const swiperRef = useRef<any>(null);

    const [selectedCountry, setSelectedCountry] = useState<ILocationOne | null>(null);
    const [selectedState, setSelectedState] = useState<ILocationOne | null>(null);
    const [selectedCity, setSelectedCity] = useState<ILocationOne | null>(null);

    const [states, setStates] = useState<{ value: string, label: string }[]>([]);
    const [cities, setCities] = useState<{ value: string, label: string }[]>([]);

    const [streetCompany, setStreetCompany] = useState<string | null>(null);
    const [number_streetCompany, setNumberStreetCompany] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [file, setFile] = useState<File>();
    const [selectedThemes, setSelectedThemes] = useState<any[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<{
        value: string,
        label: string
    }>();

    let themes_ids: any[] = [];

    if (selectedThemes.length) {
        selectedThemes.forEach((theme) => {
            themes_ids.push(theme!.value);
        });
    }

    const [price, setPrice] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [countTicket, setCountTicket] = useState("");
    const [see, setSee] = useState("");
    const [receive, setReceive] = useState("");
    const [currency, setCurrency] = useState<{
        value: string;
        label: string;
    }>();

    function create() {
        let formField = new FormData();
        formField.append('title', title);
        formField.append('description', description);
        formField.append('date', date);
        formField.append('time', time);
        formField.append('file', file!);
        formField.append('format', selectedFormat!.value);
        formField.append('themes', JSON.stringify(themes_ids));

        formField.append('price', price);
        formField.append('publishDate', publishDate);
        formField.append('countTicket', countTicket);
        formField.append('see', see);
        formField.append('receive', receive);

        formField.append('country', selectedCountry!.label);
        formField.append('state', selectedState!.label);
        formField.append('city', selectedCity!.value);
        formField.append('street', streetCompany!);
        formField.append('street_number', number_streetCompany!);
        formField.append('publish_date', publishDate!);
        formField.append('currency', currency!.label);
        console.log("🚀 ~ file: CreateEvent.tsx:93 ~ create ~ currency:", currency)

        axios.post("http://localhost:8000/api/event", formField, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage!.getItem("token")!
            }
        });
        navigate("/events");
    }

    const [animate, setAnimate] = useState("");

    function handleClickButton() {
        setAnimate("animate");
        setTimeout(() => {
            setAnimate("");
        }, 8000);
        create();
    }


    return (
        <div className="create-event">

            <Sidebar2 />
            <div className="tt">
                <Header />
                <div className="contain">
                    <div className="title-create-event">
                        <h2>Create Event</h2>
                    </div>

                    <div className='swiper-container'>
                        <div>

                            <button id="previousButton" className='left button' onClick={() => swiperRef.current!.swiper.slidePrev()}>Prev</button>
                            <button id="nextButton" className='right button' onClick={() => swiperRef.current!.swiper.slideNext()}>Next</button>
                            <Swiper
                                ref={swiperRef}
                                spaceBetween={50}
                                modules={[Navigation, Pagination]}
                                slidesPerView={1}
                                focusableElements={"Select"}
                                allowTouchMove={false}
                            >
                                <SwiperSlide className='swipe-slide'>
                                    <FormMain
                                    setTitle={setTitle}
                                    setDescription={setDescription}
                                    setDate={setDate}
                                    setTime={setTime}
                                    setFile={setFile}
                                    setEndDate={setEndDate}
                                    setSelectedThemes={setSelectedThemes}
                                    setSelectedFormat={setSelectedFormat} />
                                </SwiperSlide>
                            
                                <SwiperSlide className='swipe-slide'>
                                    <FormLocPub
                                    setSelectedCountry={setSelectedCountry}
                                    setSelectedState={setSelectedState}
                                    setSelectedCity={setSelectedCity}
                                    setStreetCompany={setStreetCompany}
                                    setNumberStreetCompany={setNumberStreetCompany}
                                    setPrice={setPrice}
                                    setPublishDate={setPublishDate}
                                    setReceive={setReceive}
                                    setSee={setSee}
                                    setCountTicket={setCountTicket}
                                    CreateEvent={CreateEvent}
                                    setCurrency={setCurrency}
                                />
                                    <div className="cr-butt field">

                                        <button className={`create-event-button button ${animate}`} onClick={handleClickButton}>Create event</button>

                                    </div>
                                </SwiperSlide>

                            </Swiper>

                        </div>
                        {/* <button id="previousButton" className='left' onClick={() => swiperRef.current!.swiper.slidePrev()}>Prev</button>
                            <button id="nextButton" className='right' onClick={() => swiperRef.current!.swiper.slideNext()}>Next</button> */}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateEvent;
