import './style.css';

interface Solicitacao {
  id: number;
  data: Date;
  tipo: string;
  id_colaborador: number;
}

export default function TabelaSolicitacaoRecisao({
  solicitacao,
}: {
  solicitacao: Solicitacao | null;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>data</th>
            <th>tipo</th>
            <th>id_colaborador</th>
          </tr>
        </thead>
        <tbody>
          <tr className="btn-ghost">
            <td>{String(solicitacao?.data)}</td>
            <td>{solicitacao?.tipo}</td>
            <td>{solicitacao?.id_colaborador.toString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
