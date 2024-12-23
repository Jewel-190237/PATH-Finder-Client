import { useState } from 'react';
import { Collapse } from 'antd';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState('1');
  const faqData = [
    { key: '1', label: 'What are the operating hours of the bus terminal?', content: 'The bus terminal operates daily from 6:00 AM to 10:00 PM, providing services throughout the day for your convenience.' },
    { key: '2', label: 'How can I purchase a bus ticket?', content: 'Tickets can be purchased at the terminal ticket counter or through our online booking system for added convenience' },
    { key: '3', label: 'Are there facilities available at the bus terminal?', content: 'Yes, the bus terminal offers various facilities, including waiting areas, restrooms, food stalls, and free Wi-Fi access for travelers.' },
    { key: '4', label: 'What should I do if my bus is delayed?', content: 'In case of a delay, please check the display boards for updated information or consult our staff at the information desk for assistance.' },
    { key: '5', label: 'What are the operating hours of the bus terminal?', content: 'The bus terminal operates daily from 6:00 AM to 10:00 PM, providing services throughout the day for your convenience.' },
    { key: '6', label: 'How can I purchase a bus ticket?', content: 'Tickets can be purchased at the terminal ticket counter or through our online booking system for added convenience' },
    
  ]

  return (
    <div
      className=" justify-center text-white items-center  overflow-hidden px-6 lg:px-0 -mt-20"
      style={{
        backgroundImage: 'url("/src/assets/Faq/FAQ.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className=' max-w-[1320px] mx-auto py-32 text-white'>
        <h1 className="heading text-left">Hear from Our Happy Clients</h1>
        <p className="description mt-2 md:mt-3 lg:mt-4">
          Trusted by hundreds, loved by all—here’s{" "}
          <br className="hidden md:block" /> what they have to share.
        </p>
        <div className='flex  flex-col lg:flex-row gap-6'>
          <div className='w-full lg:w-2/5 flex justify-center items-center'>
            <img src="/src/assets/Faq/1.png" className="w-full" alt="FAQ Illustration" />
          </div>
          <div className=" w-full lg:w-3/5 bg-[#F38122] rounded-xl">

            {/* Collapse section */}
            <div className="w-full p-[30px] mt-4 home1Faq">
              <Collapse
                accordion
                activeKey={activeKey}
                onChange={setActiveKey}
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                  <span
                    style={{
                      fontSize: '30px',
                      color: isActive ? 'white' : 'white',
                      transition: 'transform 0.5s ease',
                      marginTop: '-2px',
                    }}
                  >
                    {isActive ? '-' : '+'}
                  </span>
                )}
                className="!bg-transparent"
              >
                {faqData.map((item) => (
                  <Collapse.Panel
                    key={item.key}
                    header={
                      <div className="flex items-center justify-between">
                        <span
                          className={`${activeKey === item.key ? 'text-white' : 'text-[#FFF]'} text-xl text-white font-semibold flex items-center`}
                        >
                          {item.label}
                        </span>
                      </div>
                    }
                    className='mb-6 !border !border-[#78120D] !rounded-[12px]'
                  >
                    <p className='px-10 text-[16px] '>{item.content}</p>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

