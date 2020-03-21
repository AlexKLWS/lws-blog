import React from 'react'

import Modal from 'react-modal'

interface Props {
  modalIsOpen: boolean
  setModalIsOpen: (value: boolean) => void
}

const ArticleSubmitModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      isOpen={props.modalIsOpen}
      contentLabel='Example Modal'
      className='Editor-modal'
      overlayClassName='Editor-modal-overlay'
    >
      <h2>Hello</h2>
      <button
        onClick={() => {
          props.setModalIsOpen(false)
        }}
      >
        close
      </button>
      <div>I am a modal</div>
    </Modal>
  )
}

export default ArticleSubmitModal
