import './style.css';

interface Solicitacao {
  id: number;
  dataInicio: Date;
  dataFinal: Date;
  tipo: string;
  id_colaborador: number;
}

export default function TabelaSolicitacaoFerias({
  solicitacao,
}: {
  solicitacao: Solicitacao | null;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>dataInicio</th>
            <th>dataFinal </th>
            <th>id_colaborador</th>
          </tr>
        </thead>
        <tbody>
          <tr className="btn-ghost">
            <td>{solicitacao?.dataInicio.toString()}</td>
            <td>{solicitacao?.dataFinal.toString()}</td>
            <td>{solicitacao?.id_colaborador.toString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
