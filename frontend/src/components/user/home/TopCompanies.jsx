import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from "@mui/material";
import { getCompanies } from '../../../services/user/companies';
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
    marginBottom: "7vh"
}))

const CompaniesBox = styled(Box)(({theme}) => ({
    display: "flex",
    padding: "0px 15vw",
    alignItems: "center",
    justifyContent: "space-between"
}))

const Image = styled('img')(({theme}) => ({
    height: "65px",
    width: "65px"
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

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
        const result = await getCompanies();

        setCompanies(result);
    }

    fetchCompanies();
  }, []);

  return (
    <NewBox>
        <TitleBox>
            Top Companies that are Hiring
        </TitleBox>
        <CompaniesBox>
            {
                temp.map((company, index) => {
                    return (
                        <div key={index}>
                            <Image src={company.logo} alt="company_logo" /><br />
                            <Typography style={{ fontSize: "18px" }}>{company.name}</Typography>
                        </div>
                    )
                })
            }
        </CompaniesBox>
    </NewBox>
  )
}

export default TopCompanies