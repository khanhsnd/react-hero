'use client'
import { Button, Form, GetProp, Input, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import qs from "qs";
import styled from "styled-components";
import WrapModal from "@/component/modal";
type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
const Container = styled('div')`
    .mgb-10{
        margin-bottom:10px
    }
`
interface DataType {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    email: string;
    login: {
        uuid: string;
    };
}
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}
const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name) => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];
const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

const List = () => {
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const fetchData = () => {
        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                console.log({ results })
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };
    const [form] = Form.useForm();
    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    const showModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseModal = () => {
        setIsOpenModal(false);
    }
    const handleOkModal = () => {
        setIsOpenModal(false);
        fetchData();
    }
    return (
        <Container>
            <Button className="mgb-10" type="primary" onClick={showModal}>Primary Button</Button>
            <Table
                columns={columns}
                rowKey={(record) => record.login.uuid}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
            <WrapModal open={isOpenModal} onCancel={handleCloseModal} onOk={handleOkModal} >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        name="url"
                        label="URL"
                        rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </Form>
            </WrapModal>
        </Container>
    );
}
export default List