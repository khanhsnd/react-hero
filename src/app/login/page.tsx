'use client';
import { Container } from "@/component/container";
import { setToken } from "@/lib/rtk/slice/authSlice";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
type FieldType = {
    username: string;
    password: string;
    remember: boolean
}
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setIsLoading(true);
        dispatch(setToken(null))
        console.log('Success:', values);
        router.push('/');
    }

    return (
        <Container>
            <div className="wrap-container">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={isLoading} >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Container>
    )
}
export default Login