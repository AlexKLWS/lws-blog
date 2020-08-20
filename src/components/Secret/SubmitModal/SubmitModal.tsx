import React from 'react'
import Modal from 'react-modal'

import './SubmitModal.scss'
import { EditorError } from 'types/verifier'

interface Props {
  modalIsOpen: boolean
  submitErrors: EditorError[]
  onSubmit: () => void
  setModalIsOpen: (value: boolean) => void
}

const ArticleSubmitModal: React.FC<Props> = (props: Props) => {
  const onCancelButtonClick = () => {
    props.setModalIsOpen(false)
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      contentLabel='Example Modal'
      className='ArticleSubmitModal-modal'
      overlayClassName='ArticleSubmitModal-modal-overlay'
    >
      <div className='ArticleSubmitModal-content-container'>
        <h2 className='ArticleSubmitModal-title'>Are you ready to submit the material?</h2>
        <ul className='ArticleSubmitModal-errors-list'>
          {props.submitErrors.map((item) => {
            return (
              <li key={item.id} className='ArticleSubmitModal-error-item'>
                {item.description}
              </li>
            )
          })}
        </ul>
        <div className='ArticleSubmitModal-button-container'>
          <input
            className={props.submitErrors.length > 0 ? 'App-button inactive' : 'App-button'}
            onClick={props.onSubmit}
            type={'submit'}
            value={'Submit'}
            disabled={props.submitErrors.length > 0}
          />
          <input className='App-button' onClick={onCancelButtonClick} type={'submit'} value={'Cancel'} />
        </div>
      </div>
    </Modal>
  )
}

export default ArticleSubmitModal
