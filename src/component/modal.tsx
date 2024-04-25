import { Modal, ModalProps } from "antd";

const WrapModal = (props: ModalProps) => {
    return (
        <>
            <Modal title="Basic Modal" open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
                {props.children}
            </Modal>
        </>
    )
}
export default WrapModal