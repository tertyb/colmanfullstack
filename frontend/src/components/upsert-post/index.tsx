import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IPost, IPostMainData } from "../../interfaces/post";
import { PostPhoto } from "../post-photo";
import './index.scss';

interface IProp {
    isOpen: boolean;
    toggleIsOpen: () => void;
    onSave: (upsertPost: FormData) => Promise<void>;
    postId?: string;
    post?: IPostMainData;

}

type FormInputs = {
    description?: string;
    file?: File | string | undefined
};

type FormOutput = {
    description: string;
    file: File | string
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '3%',
    boxShadow: 24,
    p: 4,
    color: 'black'
};

export const UpsertPost: React.FC<IProp> = ({ isOpen, toggleIsOpen, post, onSave, postId }: IProp) => {

    const isEditMode = useMemo(() => !!post,[post])
    const {
        control, // Used to control Material-UI inputs
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<FormInputs>({
        defaultValues: { file: post?.image, description: post?.text },
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormInputs> = useCallback(async (data) => {
        const formData = new FormData();
        if (data.description) formData.append("text", data.description);
        formData.append("file", data.file ?? "");
        if (postId) formData.append("id", postId)

        await onSave(formData);
        toggleIsOpen();
    }, [onSave, postId, toggleIsOpen])

    const updatedFile = useMemo(() => watch("file"), [watch("file")]);

    const isFile = useMemo(() => updatedFile instanceof File, [updatedFile])
    const stringFile = useMemo(() => typeof updatedFile === 'string' ? updatedFile : isFile ? URL.createObjectURL(updatedFile!) : undefined, [updatedFile, isFile])

    const setFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files ? e.target.files[0] : undefined
        setValue('file', file, { shouldValidate: true });
    }, [setValue])

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                style={{ border: 'none' }}
                aria-describedby="unstyled-modal-description"
                open={isOpen}
                onClose={toggleIsOpen}
            >
                <Box sx={style} onSubmit={handleSubmit(onSubmit)} component="form">
                    <div className='box-content'>
                        <div className='headLines'>
                            <h3> {isEditMode ? 'edit' : 'new' }  post</h3>
                            <p className='sub-comment'> Make changes to your post here.</p>
                        </div>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "description is required" }}
                            render={({ field }) => (

                                <TextField  {...field} error={!!errors.description} helperText={errors.description?.message} className='TextField' multiline={true} rows={3} id="outlined-basic" label="Description" variant="outlined" />

                            )}
                        />
                        <div className="image-upload-container">
                            <Controller
                                name="file"
                                control={control}
                                rules={{ required: "File is required" }}
                                render={({ field }) => (
                                    <Box>
                                        <Button color={!!errors.file ? 'error' : 'primary'} style={{ marginBottom: '0px' }}
                                            variant="outlined"
                                            component="label"
                                            fullWidth
                                            sx={{ mb: 1 }}
                                        >
                                            <PostPhoto ObjectUrl={isFile} userImage={stringFile} />
                                            <input
                                                type="file"
                                                hidden
                                                onChange={(e) => {
                                                    setFile(e); // Handle file selection
                                                    field.onChange(e.target.files?.[0]); // Sync with RHF
                                                }}
                                            />
                                        </Button>


                                    </Box>
                                )}
                            />

                            {errors.file && (
                                <Typography style={{ alignSelf: 'baseline', marginLeft: '2px' }} fontSize={12} color="error" variant="caption">
                                    {errors.file.message}
                                </Typography>
                            )}
                        </div>


                        <div className='footer'>
                            <Button type='submit' disabled={!isValid} variant="contained" >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>

        </div >
    )
} 