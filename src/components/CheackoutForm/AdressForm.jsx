import React, { Fragment,useState ,useEffect} from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { commerce } from './../../libarary/commerce';
import FormInput from './CustomField';
import { Link } from 'react-router-dom';

const AdressForm = ({ checkoutToken,next}) => {
const [shippingCountries, setShippingCountries] = useState([])
const [shippingCountry, setShippingCountry] = useState('');
const [shippingSubvisions, setShippingSubvisions] = useState([])
const [shippingSubvision , setShippingSubvision] = useState('')
const [shippingOptions, setShippingOptions] = useState([])
const [shippingOption, setShippingOption] = useState('')
 const methods = useForm();

const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
    console.log(countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
}

const fetchSubdivisions= async (countryCode)=>{
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubvisions(subdivisions);
    setShippingSubvision(Object.keys(subdivisions)[0])
}

const fetchShippingOptions= async (checkoutTokenId,country,region=null)=>{
    const options= await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})

    setShippingOptions(options);
    setShippingOption(options[0].id)
}

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    },[])

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
      }, [shippingCountry]);

      useEffect(()=>{
          if(shippingSubvision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubvision) 
      },[shippingSubvision])
   
    return ( <Fragment>
        <Typography variant='h5' gutterBottom> Shipping Adress</Typography>
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry,shippingSubvision, shippingOption }))}>
                <Grid container spacing={3}>
                    <FormInput  required name="firstName" label="First name" />
                     <FormInput required name="lastName" label="Last name" />
                    <FormInput required name="address1" label="Address line 1" />
                    <FormInput required name="email" label="Email" />
                    <FormInput required name="city" label="City" />
                    <FormInput required name="zip" label="Zip / Postal code" /> 
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.label}
                            </MenuItem>
                         ))}
                        </Select>
                    </Grid>
                     <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subvisions</InputLabel>
                        <Select value={shippingSubvision} fullWidth onChange={(e) => setShippingSubvision(e.target.value)}>
                            {Object.entries(shippingSubvisions).map(([code,name])=>({id:code,label:name})).map((item)=>(
                                <MenuItem key={item.id} value={item.id}>
                                {item.label}
                              </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                        <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options </InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                        {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.label}
                        </MenuItem>
                        ))}
                        </Select>
                    </Grid> 
            </Grid> 
            <br/>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="dark">Next</Button>
          </div>
            </form>
        </FormProvider>
    </Fragment>
)}

export default AdressForm
