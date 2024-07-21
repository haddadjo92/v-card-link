import { useState, useEffect, useCallback } from 'react'
import { Container } from '@mui/material'
import CustomAutocompleteTags from '@/components/common/FormFields/CustomAutocompleteTags'
import CustomInput from '@/components/common/FormFields/CustomInput'


const options = [
    { title: "Sunday" },
    { title: "Monday" },
    { title: "Tuesday" },
    { title: "Wednesday" },
    { title: "Thursday" },
    { title: "Friday" },
    { title: "Saturday" },
]

export default function Test() {
    const [value, setValue] = useState([])

    const handleChange = useCallback((event, newValue) => setValue(newValue), [])


    return (
        <Container>
            <div style={{ padding: "50px 0px" }}>

                <CustomAutocompleteTags
                    labelText="Weekdays"
                    placeholder="Weekdays"
                    value={value}
                    options={options}
                    onChange={handleChange}
                />

                <br />
                <br />
                <br />
                <br />

                <CustomInput
                    labelText="Mobile Number"
                    placeholder="Mobile Number"
                    fullWidth
                />


                <br />
                <br />
                <br />
                <br />




            </div>
        </Container>
    )
}