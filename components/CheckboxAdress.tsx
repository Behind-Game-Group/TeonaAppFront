import React, { useEffect } from 'react';
import {
    View,
  } from 'react-native';
  import Adress from '../app/model/adress'; 
  import axios from 'axios';


  const CheckboxAdress: React.FC = () => {

    const [adress, setAdress] = React.useState<Adress[]>([])   

    useEffect(() => {
        const getAdress = async () => {
            try {

                
                const request = await axios.get(`http://localhost:8082/api/adress/getUserAdress?userId=1`);
                
                const response = request.data.map((adress: any) => new Adress( 
                    adress.id, 
                    adress.firstName,
                    adress.lastName, 
                    adress.streetName, 
                    adress.streetNameOptional, 
                    adress.postCode, 
                    adress.city, 
                    adress.countryCode, 
                    adress.country ) );
                    
                setAdress(response)

                console.log(request)

            }   
            catch (error) {
                console.log(error);
            }
        }
        getAdress();
        }, []);
        return (
            <div className="checkbox-adress">
                {adress.map(ad=>(<li><input type="checkbox" name={"nom"+ ad.firstName} value={ad.id}/>
                    {ad.streetName}, {ad.city}, {ad.country}</li>))} 
            </div>
        
            )
        }
        
        export default CheckboxAdress
