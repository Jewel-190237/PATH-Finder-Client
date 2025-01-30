import { useState } from 'react';
import { Collapse } from 'antd';
import bg from '../../assets/Faq/FAQ.png'
import man from "../../assets/Faq/1.png"
const FAQ = () => {
  const [activeKey, setActiveKey] = useState('1');
  const courseData = [
    { key: '1', label: 'What are the available course timings?', content: 'Courses are available with flexible schedules, including morning, afternoon, and evening batches to accommodate your preferences.' },
    { key: '2', label: 'How can I enroll in a course?', content: 'You can enroll in a course by visiting our registration portal online or contacting our admissions office for guidance.' },
    { key: '3', label: 'Are there any facilities available for students?', content: 'Yes, we provide well-equipped classrooms, a comprehensive library, online learning resources, and student support services.' },
    { key: '4', label: 'What should I do if I miss a class?', content: 'In case you miss a class, you can access recorded sessions through the student portal or schedule a one-on-one session with the instructor for assistance.' },
    { key: '5', label: 'What is the duration of each course?', content: 'Course durations vary depending on the subject. We offer short-term courses of a few weeks and long-term courses up to several months.' },
    { key: '6', label: 'Is there any certification provided?', content: 'Yes, upon successful completion of the course, you will receive a certification recognized by industry experts.' },
  ];

  return (
    <div
      className=" justify-center text-white items-center  overflow-hidden px-6 lg:px-0 -mt-20 py-24"
      style={{
        backgroundImage: `url(${bg})`,
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
            <img src={man} className="w-full" alt="FAQ Illustration" />
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
                {courseData.map((item) => (
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

