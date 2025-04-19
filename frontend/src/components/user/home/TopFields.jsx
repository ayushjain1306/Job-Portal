import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from "@mui/material";
import { getFields } from '../../../services/user/fields';
import react from "../../../assets/react.svg";

const NewBox = styled(Box)(({theme}) => ({
    width: "97%",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgba(0,0,0,0.2)",
    textAlign: "center",
    height: "40vh",
    paddingTop: "3vh",
    marginBottom: "2vh"
}))

const TitleBox = styled(Box)(({theme}) => ({
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "4vh"
}))

const FieldsBox = styled(Box)(({theme}) => ({
    display: "grid",
    padding: "0px 10vw",
    gridTemplateColumns: "25% 25% 25% 25% "
}))

const NewTypo = styled(Typography)(({theme}) => ({
    fontSize: "16px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px solid lightgray",
    marginTop: "2vh",
    marginRight: "10px"
}))

const temp = [
    {
        id: 1,
        name: "ervwerv",
        logo: react
    },
    {
        id: 1,
        name: "ervwerv",
        logo: react
    },
    {
        id: 1,
        name: "ervwerv",
        logo: react
    },
    {
        id: 1,
        name: "ervwerv",
        logo: react
    },
    {
        id: 1,
        name: "ervwerv",
        logo: react
    }
]

const TopFields = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
        const result = await getFields();

        setFields(result);
    }

    fetchFields();
  }, []);

  return (
    <NewBox>
        <TitleBox>
            Top Skills in Demand
        </TitleBox>
        <FieldsBox>
            {
                temp.map((field, index) => {
                    return (
                        <NewTypo key={index}>{field.name}</NewTypo>
                    )
                })
            }
        </FieldsBox>
    </NewBox>
  )
}

export default TopFields