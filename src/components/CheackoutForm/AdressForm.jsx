import React, { Fragment,useState ,useEffect} from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import FormInput from './CustomField';
import { commerce } from './../../libarary/commerce';


const AdressForm = ({ checkoutToken}) => {
const [shippingCountries, setShippingCountries] = useState([])
const [shippingCountry, setShippingCountry] = useState('')
const [shippingSubvisions, setShippingSubvisions] = useState([])
const [shippingSubvision , setShippingSubvision] = useState('')
const [shippingOptions, setShippingOptions] = useState([])
const [shippingOption, setShippingOption] = useState('')
 const methods = useForm();

const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
    setShippingCountries(countries);
}
    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    },[])

   
    return (
        <Fragment>
            <Typography variant='h5' gutterBottom> Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form>
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First name" />
                         <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address line 1" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip / Postal code" /> 
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value='' fullWidth>
                                <MenuItem >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subvisions</InputLabel>
                            <Select >
                                <MenuItem>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                            <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options </InputLabel>
                            <Select >
                                <MenuItem >
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>*/}
         </Grid> 
                </form>
            </FormProvider>
        </Fragment>
    )
}

export default AdressForm
