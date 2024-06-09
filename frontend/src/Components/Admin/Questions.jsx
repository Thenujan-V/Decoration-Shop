import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { getQuestionsFromUsers, sendSMS } from '../../Services/AdminServices';
import { question } from '../Styles';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../../Services/JwtToken';
import { sendEmails } from '../../Services/EmailServices';


const Questions = () => {
    const navigate = useNavigate()
    const decoded = retrieveToken()
    
    useEffect(() => {
        if(decoded){
        const userRole = decoded.role
        if(userRole === 'user' || userRole === 'employee'){
            navigate('/unauthorized')
        }
        }
    }, [decoded])

    const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [sendSms, setSendSms] = useState('')

  useEffect(() => {
        const fetchQuestions = async() => {
            try{
                const response = await getQuestionsFromUsers();
                console.log('que :',response.data)
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
console.log('ans :', answers)

    const handleAnswerSubmit = async(id, mailId, message, question) => {
        try{
            const data = {
                to : mailId,
                subject : question,
                text : message
            }
            console.log('data :', data)
            await sendEmails(data)
        }
        catch(error){
            console.log('error :', error)
        }
        
// SMS SEND USERS WITH Twilio

        // const answer = answers[id];
        // const datas = {
        //     answer : answer,
        //     userPhoneNumber : userPhoneNumber
        // }
        // try{
        //     const response = await sendSMS(id, datas)
        //     console.log(response.data)
        //     setSendSms(response.data)
        // }
        // catch(error){
        //     console.log('sending messag faild :', error.response)
        // }
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
                        <h5 className="card-title">{question.email}</h5>
                        <p className="card-text"> Message -- {question.content}</p>
                        <div className="form-group">
                            <label htmlFor={`answer-${question.id}`}>Your Answer</label>
                            <input
                            type="text"
                            id={`answer-${question.id}`}
                            className="form-control"
                            value={answers.value}
                            onChange={(e) => handleAnswerChange(e, question.id)}
                            required
                            />
                        </div>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={(e) => handleAnswerSubmit(question.user_Id, question.email, answers.undefined, question.content)}
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