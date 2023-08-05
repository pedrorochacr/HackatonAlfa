import React, { useEffect, useState } from 'react';
import "./style.css"
import axios from 'axios';

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



interface Report {
    id: number;
    nome: string;
    centroDeCustos: string;
    refAreaAtuacao: string;
    descricao: string;
    foto1: string;
    foto2:  null |string;
    foto3:  null | string;
    localizacao: string;
  }

export default function TabelaReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedReport, setselectedReport] = useState<Report>();
    const regex = /"/g;
    const [atualizou, setAtualizou] = useState(false)
    // Função para fazer o request dos reportss na URL
    useEffect(() => {
        setAtualizou(false)
        fetch('http://localhost:4000/report/')
            .then((response) => response.json())
            .then((data) => setReports(data))

            .catch((error) => console.error('Erro ao recuperar os reports:', error));
    }, [atualizou]);
    const togglePopup = (report: Report | null) => {
        setShowPopup(!showPopup);
        if(report){
            setselectedReport(report);
        }
        
    };
    
    // Função para renderizar os reportss em uma tabela
    const renderReportsTable = () => {
        
        return (
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Localização </th>
                            <th>Centro de Custos</th>
                            <th>Área de Atuação</th>
                            <th>Descrição</th>
                            <th>Foto1</th> 
                            <th>Foto2</th> 
                            <th>Foto3</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr className='btn-ghost' key={report.id} >
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{report.nome.replace(regex,'')}</div>

                                        </div>
                                    </div></td>
                                <td><div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">{report.localizacao.replace(regex,'')}</div>
                                        {report.localizacao && (<div onClick={()=> {
                                            const [latitude, longitude] = report.localizacao.split(' ');
                                            window.open(`https://www.google.com/maps/@${latitude},${longitude},`,'_blank')
                                            }} className='pl-6 hover:font-bold cursor-pointer'>Pesquisar no Maps</div>)}
                                    </div>
                                </div></td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{report.centroDeCustos.replace(regex,'')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{report.refAreaAtuacao.replace(regex,'')}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div>{report.descricao}</div>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                            <div>
                                                <div>{report.foto1}</div>

                                            </div>
                                        </div>                                  
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                            <div>
                                                <div>{report.foto2}</div>

                                            </div>
                                        </div>                                  
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                            <div>
                                                <div>{report.foto3}</div>

                                            </div>
                                        </div>                                  
                                </td>
                            </tr>
                        ))}
                     </tbody> 
                </table>
               
            </div>
        );
    };

    return (
        <div>
            {renderReportsTable()}
        </div>
    );
};

