import React from 'react'
import './FindCar.scss'
import { getByCar } from "../Services/carServices";


const FindByCar = () => {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: byCars } = useQuery(["Car", id], () =>
        getByCar(id)
    );

    if (byCars) {

        return (
            <>

            </>
        );
    }
}

export default FindByCar