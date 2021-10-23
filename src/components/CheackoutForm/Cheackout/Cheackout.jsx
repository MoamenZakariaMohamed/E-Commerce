import React, { Fragment,useState,useEffect } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './style'
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../libarary/commerce';


const steps=['Shipping address','Payment details'];

const Cheackout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null);
   const[shippingData,setShippingData]=useState({})
    const classes=useStyles()

    useEffect(()=>{
        const generateToken=async ()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id , {type:'cart'})
             
                setCheckoutToken(token)
            }catch(error){

            }
        }
        generateToken();
    },[cart]);
    const nextStep=()=>{
        setActiveStep((prevActiveState)=>prevActiveState +1)
    }
    const backStep=()=>{
        setActiveStep((prevActiveState)=>prevActiveState -1)
    }

    const next=(data)=>{
        setShippingData(data)

        nextStep()
        
    }
    const Confirmation=()=>(
            <div>
                Confirmation
            </div>
        )

    const Form=()=>activeStep===0  ? <AdressForm checkoutToken={checkoutToken} next={next}/>:<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken}/>;
  

    return (
        <Fragment>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h3' align='center'>Cheackout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep===steps.length?<Confirmation/>:checkoutToken&&<Form/>}
            </Paper>
        </main>

        </Fragment>
        )
}

export default Cheackout

