import React, { useEffect, useState } from 'react';
import {
    View,
  } from 'react-native';
  import Adress from '../app/model/adress'; 
  import axios from 'axios';

  type CheckboxAdressProps = {
    onSelectAddress: (address: Adress | null) => void;
  };

  const CheckboxAdress: React.FC<CheckboxAdressProps> = ({ onSelectAddress }) => {

    const [adress, setAdress] = React.useState<Adress[]>([])   
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)

    useEffect(() => {
        const getAdress = async () => {
            try {

                let token = localStorage.getItem('authToken');

                if (!token) {
                console.log('Token JWT introuvable');
                return;
                }

                // Configurer l'en-tête Authorization avec le token
                const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                };
                const request = await axios.get(`http://localhost:8082/api/adress/getAuthAdress`, config);
                
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

        const CheckboxAdress = (address: Adress) => {
             if (selectedAddressId === address.id) {
            setSelectedAddressId(null);
            onSelectAddress(null); 
            } else {
            setSelectedAddressId(address.id);
            onSelectAddress(address); 
            }
          };
        return (
            <div className="checkbox-adress">
                {adress.map(ad=>(<li><input type="checkbox" name={"nom"+ ad.firstName} value={ad.id}
                            checked={selectedAddressId === ad.id}
                            onChange={() => CheckboxAdress(ad)} />
                    {ad.streetName}, {ad.city}, {ad.country} </li>))} 
            </div>
        
            )
        }
        
        export default CheckboxAdress
