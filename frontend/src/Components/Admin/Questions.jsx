import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { getQuestionsFromUsers, sendSMS } from '../../Services/AdminServices';
import { question } from '../Styles';


const Questions = () => {
    const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [sendSms, setSendSms] = useState('')

  useEffect(() => {
        const fetchQuestions = async() => {
            try{
                const response = await getQuestionsFromUsers();
                console.log(response.data)
                setQuestions(response.data)
            }
            catch(error){
                console.log('error fetching questions :', error.response)
            }
        }
        fetchQuestions()
    }, []);

    const handleAnswerChange = (e, id) => {
        setAnswers({
        ...answers,
        [id]: e.target.value
        });
    };

    const handleAnswerSubmit = async(id, userPhoneNumber) => {
        
// SMS SEND USERS WITH Twilio

        const answer = answers[id];
        const datas = {
            answer : answer,
            userPhoneNumber : userPhoneNumber
        }
        try{
            const response = await sendSMS(id, datas)
            console.log(response.data)
            setSendSms(response.data)
        }
        catch(error){
            console.log('sending messag faild :', error.response)
        }
    };

  return (
    <div>
        <div style={{display:'flex'}}>
            <AdminVerticalNav />
            <div style={{flex:1}} className='container questions mt-5'>
                <h1 className="text-center">User Questions</h1>
                <div className="questions-list">
                    {questions.map(question => (
                    <div className="card mb-3" key={question.user_Id}>
                        <div className="card-body">
                        <h5 className="card-title">Question from {question.user_name}</h5>
                        <p className="card-text"> -- {question.message}</p>
                        <div className="form-group">
                            <label htmlFor={`answer-${question.id}`}>Your Answer</label>
                            <input
                            type="text"
                            id={`answer-${question.id}`}
                            className="form-control"
                            value={answers.value}
                            onChange={(e) => handleAnswerChange(e, question.user_Id)}
                            required
                            />
                        </div>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => handleAnswerSubmit(question.user_Id, question.contact_no)}
                        >
                            Submit Answer
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Questions