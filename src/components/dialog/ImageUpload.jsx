import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import Modal from "react-modal";
import {
    ArrowLeft,
    CloseIcon,
    ImageIcon,
} from "../../frame/assets/CustomIcons";
import { useMemo } from "react";
import { changeImage } from "../../api/user";
import { useWallet } from "@solana/wallet-adapter-react";
import Spinner from "../Spinner";

const customStyles = {
    content: {},
    overlay: {
        background: "#161438b3",
        width: 360,
        zIndex: 999999,
    },
};
Modal.setAppElement(document.getElementById("root"));

export default function ImageUpload({
    image,
    setImage,
    modalIsOpen,
    closeModal,
    customStyles,
}) {
    const wallet = useWallet();
    const [files, setFiles] = useState([]);
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragReject,
        isDragActive,
        isDragAccept,
    } = useDropzone({
        accept: {
            "image/*": [],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });
    const baseClass = `border-[1px] h-[280px] w-[280px] ${files.length === 0 ? "border-dashed" : "border-none"
        } relative grid place-content-center mx-auto rounded-md mt-5 hover:border-[#49c1fd] cursor-pointer group overflow-hidden bg-[#393869]`;

    const classes = useMemo(() => {
        let style = baseClass;
        if (isDragActive) {
            style += "border-[#49c1fd] border-normal";
        }
        if (isDragAccept) {
            style += "border-[#49c1fd] border-none";
        }
        return style;
    }, [isFocused, isDragReject, isDragActive, isDragAccept]);

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (wallet.publicKey === null) return;
        try {
            setLoading(true);
            console.log(files[0]);
            const res = await changeImage(wallet.publicKey, files[0]);
            console.log("result:", res);
            setLoading(false);
        } catch (error) {
            console.log("Image upload error:", error);
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            // onRequestClose={closeModal}
            style={customStyles}
            className={"notice-modal w-[360px]"}
        >
            <div className="h-full">
                {/* Modal Header beginning */}
                <div className="relative flex items-center">
                    <ImageIcon />
                    <h5 className="ml-2.5 font-[800] uppercase text-white">
                        Upload image
                    </h5>
                    <button
                        className="btn-topper absolute right-0 -top-2 flex h-11 w-11 items-center justify-center rounded-xl border-[2.5px] border-[#49487C] md:hidden"
                        onClick={closeModal}
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        className="btn-modal-close absolute right-0 hidden md:block"
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </button>
                </div>
                {/* Modal Header end */}
                {/* Main content beginning */}
                <div className="">
                    <div
                        {...getRootProps({ className: classes })}
                        style={{ pointerEvents: loading ? "none" : "all" }}
                    >
                        {loading && (
                            <div className="absolute z-40 grid h-full w-full place-content-center bg-[#00000099]">
                                <Spinner height={50} color="#fff" />
                            </div>
                        )}
                        <input {...getInputProps()} disabled={loading} />
                        {files.length === 0 && (
                            <p className="relative z-20 text-center text-[12px] text-[#eee] group-hover:text-[#49c1fd]">
                                Drag &#38; drop some files here
                                <br />
                                or click to select files
                            </p>
                        )}
                        <div className="absolute left-0 top-0 z-10 grid h-[280px] w-[280px] place-content-center">
                            {files.length !== 0 && (
                                <img
                                    src={files[0].preview}
                                    className="h-[280px] w-[280px] object-cover transition-all duration-100 group-hover:scale-110"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-2 px-1">
                    <button
                        className="mt-1 w-full rounded-md bg-btn-gradient-1 py-2 text-[12px] font-semibold uppercase text-light"
                        onClick={handleUpload}
                        disabled={files.length === 0}
                    >
                        save
                    </button>
                </div>
                {/* Main content end */}
            </div>
        </Modal>
    );
}
