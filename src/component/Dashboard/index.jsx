import React from 'react';
import Wrapper from './style';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from 'react-router';

const Dashboard = () => {
    // Data for multiple cards
    const cardData = [
        { class: "II", section: "Tulip", year: 2023, quarter: "Q2", ac: 50.23, lo: 50.23, ro: 50.23 },
        { class: "III", section: "Tulip", year: 2023, quarter: "Q2", ac: 50.23, lo: 50.23, ro: 50.23 },
        { class: "IV", section: "Tulip", year: 2023, quarter: "Q2", ac: 50.23, lo: 50.23, ro: 50.23 }
    ];
    const navigate = useNavigate();
    const handleBackButton = () => {
        navigate(-1)
    }

    return (
        <Wrapper>
        <div className="class-header">
        <div className="icon">
        <button className="back-button" onClick={handleBackButton}>
            <FaArrowLeft />
          </button>
        </div>
        <div className="class-title">
          <h2>Teacher's Dashboard</h2>
        </div>
        </div>

            <main>
                {cardData.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="info">
                            <p><strong>Class :</strong> {card.class}</p>
                            <p><strong>Section :</strong> {card.section}</p>
                            <p><strong>Year :</strong> {card.year}</p>
                            <p><strong>Quarter :</strong> {card.quarter}</p>
                        </div>
                        <div className="stats">
                            <div className="box ac">
                                <p>{card.ac}</p>
                                <span>AC (%)</span>
                            </div>
                            <div className="box lo">
                                <p>{card.lo}</p>
                                <span>LO (%)</span>
                            </div>
                            <div className="box ro">
                                <p>{card.ro}</p>
                                <span>RO (%)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </Wrapper>
    );
};

export default Dashboard;
