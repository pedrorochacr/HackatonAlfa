import QRCode from 'react-qr-code';

interface Equipment {
  codigo: string;
  descricao: string;
  status: string;
  anexo: string;
  tipo: string;
}

async function fetchEquipment(codigo: string) {
  const endpoint = `http://localhost:4000/equipment/${codigo}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Equipment;
}

export default async function ArchivePage({
  params,
}: {
  params: { codigo: string };
}) {
  const { codigo, descricao, status, anexo, tipo } = await fetchEquipment(
    params.codigo
  );
  const downloadLink = `http://localhost:4000/file/${anexo}`;

  return (
    <>
      <div className="flex flex-col items-center p-20 space-y-4">
        <h1 className="text-4xl font-bold mb-10">
          {tipo === 'Area' ? 'Área' : 'Equipamento'}
        </h1>
        <h2 className="text-3xl">
          Codigo: {codigo} / <span>Liberado: {status}</span>
        </h2>
        <p className="prose">{descricao}</p>
        <a href={downloadLink} target="_blank" className="btn btn-primary">
          Visualizar Anexo
        </a>
      </div>
      <QRCode value={downloadLink} className="float-right p-14" />
    </>
  );
}
