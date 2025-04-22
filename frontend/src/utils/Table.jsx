import React from 'react'
import { Table as TableComp, TableHead, TableBody, TableCell, TableRow, styled, Button } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const Table = ({ data, headers, targets, actions, handleDelete, handleEdit, handleView }) => {
  return (
    <TableComp>
        <TableHead>
            <TableRow>
                {
                    headers.map((element, index) => {
                        return (
                            <TableCell align="center" key={index} style={{ fontWeight: "bold" }}>{element}</TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
        <TableBody>
            {
                data.map((element, ind) => {
                    return (
                        <TableRow key={element._id}>
                            {
                                targets.map((target, index) => {
                                    return (
                                        target === "action" ?
                                            <TableCell align="center" key={index}>
                                                {
                                                    actions.map((act, index) => {
                                                        return (
                                                            <Button key={index} variant="outlined" color="primary" onClick={ () => act === "Delete" ? handleDelete(element._id) : act === "Edit" ? handleEdit(element._id) : handleView(element._id) }>
                                                                {
                                                                    act === "Delete" 
                                                                    ?
                                                                    <Delete style={{color: "black"}} />
                                                                    :
                                                                    act === "Edit" 
                                                                    ?
                                                                    <Edit style={{color: "black"}} />
                                                                    :
                                                                    <Visibility style={{color: "black"}} />
                                                                }
                                                            </Button>
                                                        )
                                                    })
                                                }
                                            </TableCell>
                                        :
                                        target === "Sr. No." ?
                                        <TableCell align="center" key={index}>{ind+1}</TableCell>
                                        :
                                        <TableCell align="center" key={index}>{element[target]}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    )
                })
            }
        </TableBody>
    </TableComp>
  )
}

export default Table