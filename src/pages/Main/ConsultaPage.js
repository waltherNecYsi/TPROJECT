import { Helmet } from "react-helmet-async";
import MainConsulta from "../../sections/Main/MainConsulta";

export default function ConsultaPage() {
  return (
    <>
      <Helmet>
        <title> Consulta | Sukha</title>
      </Helmet>
      <MainConsulta />
    </>
  );
}
