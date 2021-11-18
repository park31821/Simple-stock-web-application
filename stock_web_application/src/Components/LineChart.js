import React from "react";
import {Line} from 'react-chartjs-2'
import styled from "styled-components";

const Container = styled("div")`
    margin-top: 30px;
`

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Closing Price History',
            font: {
                size: 30,
            }
        },
    },
    scales: {
        x: {
            display: true,
            title:{
                display: true,
                text: "Date",
                font: {
                    size: 20,
                }
            },
            reverse: true,
            ticks: {
                stepSize: 1,
            }
 
        },
        
        y: {
            display: true,
            title:{
                display: true,
                text: "Price",
                font: {
                    size: 20,
                }
            }
        }
    }
}

const LineChart = (props) => {
    
    return (
        <Container>
            <Line
                data={{
                    labels: (props.object).map(x => x['date']),
                    datasets: [{
                        label: 'Closing Price',
                        data: (props.object).map(x => x['4. close']),
                        borderWidth: 4,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        
                    }],
                }}
                options = {options}
                width={500}                
            />
        </Container>
    )
}

export default LineChart