import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import ReservationModal from './ReservationModal';

const Modals = () => {
    const { isResModalOpen, setIsResModalOpen } = useAppContext();

    return (
        <>

            {/* Advanced Reservation Modal */}
            <ReservationModal isOpen={isResModalOpen} onClose={() => setIsResModalOpen(false)} />
        </>
    );
};

export default Modals;
