import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { InputField } from './InputField';
import { InputTextArea } from './InputTextArea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { Post } from '@/Posts';

interface PostEditFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Post;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

interface FormData {
    title: string;
    body: string;
}

const postEditSchema = z.object({
    title: z.string().min(1, 'Title is required').max(30, "Title can't more than 30 character"),
    body: z.string().min(1, 'Body is required').max(500, "Body can't more than 500 character"),
});

export function PostEditForm({ isOpen, onClose, initialData, setPosts }: PostEditFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(postEditSchema),
        defaultValues: {
            title: initialData?.title,
            body: initialData?.body,
        },
    });

    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

    const onSubmit = (data: FormData) => {
        setPosts((prev: Post[]) =>
            prev.map((post) => (post.id === initialData.id ? { ...post, ...data } : post)),
        );
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="p-0 ">
                <DialogHeader className="">
                    <DialogTitle className="border-b px-4 py-3 text-base text-left">
                        Edit Post
                        <p className="text-xs font-normal">Edit the fields of this post.</p>
                    </DialogTitle>

                    <DialogDescription asChild>
                        <form
                            id="edit-form"
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 px-4 py-3"
                        >
                            <InputField
                                id="title"
                                label="Title"
                                error={errors.title?.message}
                                {...register('title')}
                            />

                            <InputTextArea
                                id="body"
                                label="Body"
                                error={errors.body?.message}
                                {...register('body')}
                            />
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="border-t px-4 py-4 sm:items-center">
                    <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting} form="edit-form">
                        <Save /> Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
