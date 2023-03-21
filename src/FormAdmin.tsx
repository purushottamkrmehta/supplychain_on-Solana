import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { productreg, Props } from './productreg';

window.Buffer = window.Buffer || require('buffer').Buffer;

const FormContainer = styled.div`
    border: 1px solid black;

    width: 80%;
    margin: auto;
    text-align: center;
    form {
       
`;

const F_cont = styled.div`
width: 80%;
margin: auto;
input {
    width: 100%;
    padding: 0.3em;
    margin: 0.5em 0em;
}
}
button {
font-size: 15px;
margin: 0.6em;
padding: 0.5em;
border: 2px solid black;
border-radius: 5px;
font-weight: bold;
}


`;

const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #7983ff;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const Field: FC = () => {
    const [data, setdata] = useState<Props>();
    const [generateNft, setGenerateNft] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [pcate, setPcate] = useState<string>('');
    const [mDate, setMdate] = useState<string>('');
    const [mPlace, setMplace] = useState<string>('');
    const [expDate, setExp] = useState<string>('');
    const [lotNo, setLotNo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useMemo(() => {
        setdata({
            name: name,
            symbol: 'NFT',
            sellerFeeBasisPoints: 0,
            description: 'this is sample product discription by purushottam ',
            attributes: [
                { trait_type: 'product_category', value: 'grey' },
                { trait_type: 'manufacturing_date', value: 'maroon' },
                { trait_type: 'manufacturing_place', value: 'scarface' },
                { trait_type: 'expiry_date', value: 'gold stud' },
                { trait_type: 'lot_no', value: 'nose1' },
            ],
        });
        if (data) {
            data['name'] = name;
            data['attributes'][0].value = pcate;
            data['attributes'][1].value = mDate;
            data['attributes'][2].value = mPlace;
            data['attributes'][3].value = expDate;
            data['attributes'][4].value = lotNo;
        }
    }, [generateNft]);

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handlePcateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPcate(event.target.value);
    }

    function handleMdateChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMdate(event.target.value);
    }

    function handleMplaceChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMplace(event.target.value);
    }

    function handleExpChange(event: React.ChangeEvent<HTMLInputElement>) {
        setExp(event.target.value);
    }

    function handleLotNoChange(event: React.ChangeEvent<HTMLInputElement>) {
        setLotNo(event.target.value);
    }

    return (
        <FormContainer>
            <h1>Hello Admin !</h1>
            <h1>Fill the Product details</h1>
            <F_cont>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    name="product_category"
                    value={pcate}
                    onChange={handlePcateChange}
                    placeholder="Product Category"
                />
                <input
                    type="text"
                    name="manufacturing_date"
                    value={mDate}
                    onChange={handleMdateChange}
                    id="manufacturing_date"
                    placeholder="Manufacturing Date"
                />
                <input
                    type="text"
                    name="manufacturing_place"
                    value={mPlace}
                    onChange={handleMplaceChange}
                    id="manufacturing_place"
                    placeholder="Manufacturing Place"
                />
                <input
                    type="text"
                    name="expiry_date"
                    id="expiry_date"
                    onChange={handleExpChange}
                    value={expDate}
                    placeholder="Expiry Date"
                />
                <input
                    type="text"
                    name="lot_no"
                    id="lot_no"
                    value={lotNo}
                    onChange={handleLotNoChange}
                    placeholder="Lot Number"
                />
                <input type="text" name="live_location" id="live_location" />

                <button
                    onClick={() => {
                        setGenerateNft(true);
                        if (data) {
                            data['name'] = name;
                            data['attributes'][0].value = pcate;
                            data['attributes'][1].value = mDate;
                            data['attributes'][2].value = mPlace;
                            data['attributes'][3].value = expDate;
                            data['attributes'][4].value = lotNo;
                        }
                        productreg(data!);
                    }}
                >
                    {generateNft ? 'Generating NFT...' : 'Generate Token'}
                </button>
            </F_cont>
        </FormContainer>
    );
};

export default Field;
