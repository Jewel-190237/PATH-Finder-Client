import { useEffect, useState } from 'react';
import { Collapse } from 'antd';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState('1');
  const faqData = [
    { key: '1', label: 'What are the operating hours of the bus terminal?', content: 'The bus terminal operates daily from 6:00 AM to 10:00 PM, providing services throughout the day for your convenience.' },
    { key: '2', label: 'How can I purchase a bus ticket?', content: 'Tickets can be purchased at the terminal ticket counter or through our online booking system for added convenience' },
    { key: '3', label: 'Are there facilities available at the bus terminal?', content: 'Yes, the bus terminal offers various facilities, including waiting areas, restrooms, food stalls, and free Wi-Fi access for travelers.' },
    { key: '4', label: 'What should I do if my bus is delayed?', content: 'In case of a delay, please check the display boards for updated information or consult our staff at the information desk for assistance.' },
  ]

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center  overflow-hidden px-6 lg:px-0"
      style={{
        backgroundImage: 'url("/src/assets/Faq/FAQ.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-[1320px] w-full pt-28 pb-10">

        {/* Collapse section */}
        <div className="w-full max-w-[1320px] mt-12 home1Faq">
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
                      className={`${activeKey === item.key ? 'text-white' : 'text-[#0000]'} text-xl text-black font-semibold flex items-center`}
                    >
                      {item.label}
                    </span>
                  </div>
                }
                className='mb-6 !border !border-[#10B981] !rounded-[12px]'
              >
                <p className='px-10 text-[16px] '>{item.content}</p>
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

