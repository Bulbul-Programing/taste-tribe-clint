"use client"
import TTForm from '@/src/components/Form/TTForm';
import TTInput from '@/src/components/Form/TTInput';
import Modal from '@/src/components/modal';
import { Button } from '@nextui-org/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
const ResetPassword = () => {
    const [submitResetCode, setSubmitResetCode] = useState(false);
    const [loading, setLoading] = useState(false)
    const [queryParams, setQueryParams] = useState({});
    const router = useRouter()

    const searchParams = useSearchParams()
    const searchToken = searchParams.get('token')

    useEffect(() => {
        if (!searchToken) {
            return router.push('/')
        }
    }, [searchToken])

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        // Handle form submission
        setSubmitResetCode(true);
    };
    return (
        <div>
            <Modal onClose={() => setSubmitResetCode(false)} width={400}>
                <h1 className='text-lg font-medium text-center mb-3'>Reset Your password!</h1>
                <TTForm onSubmit={handleSubmit}>
                    <TTInput label='New password' type='password' name='password'></TTInput>
                    <TTInput label='Retype Password' type='password' name='retypePassword'></TTInput>
                    <Button
                        className="w-full bg-[#17D893] font-bold text flex-1"
                        type="submit"
                        isLoading={loading}
                    >
                        Reset password
                    </Button>
                </TTForm>
            </Modal>
        </div>
    );
};

export default ResetPassword;