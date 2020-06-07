import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import "./PriceModal.css";

PricingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  price: PropTypes.object.isRequired,
  image_url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
};

function PricingModal({ isOpen, price, image_url, onClose, name, region }) {
  const [modalState, setModalState] = useState(isOpen);

  const onCloseModal = () => {
    setModalState(false);
    onClose();
  };

  return (
    <>
      <Modal open={modalState} onClose={onCloseModal}>
        <div className="pricing_modal">
          <div className="modal-header">
            <img className="modal-image" src={image_url} />

            <span className="modal-name">
              <h6>{name}</h6>
              <p>{region}</p>
            </span>
          </div>
          <h3 className="modal-heading">Pricing</h3>
          <table className="modal-table">
            <tbody className="modal-tbody">
              <tr className="modal-tr">
                <td className="modal-td">
                  <span className="pricing-label">1 Week - 1 Month</span>
                </td>
                <td className="modal-td">
                  <span className="pricing-value">$ {price.monthly}</span>
                </td>
              </tr>
              <tr className="modal-tr">
                <td className="modal-td">
                  <span className="pricing-label">6 Months</span>
                </td>
                <td className="modal-td">
                  <span className="pricing-value">$ {price.halfyearly}</span>
                </td>
              </tr>
              <tr className="modal-tr">
                <td className="modal-td">
                  <span className="pricing-label">1 Year</span>
                </td>
                <td className="modal-td">
                  <span className="pricing-value">$ {price.yearly}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}

export default PricingModal;
