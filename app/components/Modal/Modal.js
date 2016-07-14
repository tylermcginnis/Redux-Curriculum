import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import {
  newDecisionTop, pointer, newDecisionInputContainer,
  newDecisionInput, submitDecisionBtn, darkBtn, or, titleInput,
  titleContainer } from './styles.css'
import { formatDecision } from 'helpers/utils'

const modalStyles = {
  content: {
    width: 400,
    margin: '0px auto',
    height: 437,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, func, bool } = PropTypes
Modal.PropTypes = {
  firstDecisionText: string.isRequired,
  secondDecisionText: string.isRequired,
  titleText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDecisionText: func.isRequired,
  saveAndCloseModal: func.isRequired,
}

export default function Modal (props) {
  function submitDecision () {
    props.saveAndCloseModal(formatDecision(props.titleText, props.firstDecisionText, props.secondDecisionText, props.user))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'New Decision'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newDecisionTop}>
          <span>{'Would you rather...'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={titleContainer}>
          <input
            onChange={(e) => props.updateDecisionText('titleText', e.target.value)}
            value={props.titleText}
            maxLength={80}
            type='text'
            className={titleInput}
            placeholder="Title" />
        </div>
        <div className={newDecisionInputContainer}>
          <textarea
            onChange={(e) => props.updateDecisionText('firstDecisionText', e.target.value)}
            value={props.firstDecisionText}
            maxLength={140}
            type='text'
            className={newDecisionInput}
            placeholder="First Decision" />
        </div>
        <div className={or}>OR</div>
        <div className={newDecisionInputContainer}>
          <textarea
            onChange={(e) => props.updateDecisionText('secondDecisionText', e.target.value)}
            value={props.secondDecisionText}
            maxLength={140}
            type='text'
            className={newDecisionInput}
            placeholder="Second Decision" />
        </div>
        <button
          className={submitDecisionBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDecision}>
            {'Submit'}
        </button>
      </ReactModal>
    </span>
  )
}
