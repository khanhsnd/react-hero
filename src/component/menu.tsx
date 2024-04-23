import { UserOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useRouter } from "next/navigation"
import React from "react"

const list = [
    {
        key: 'table',
        icon: React.createElement(UserOutlined),
        label: 'Table',
    }
]

const LeftMenu = () => {
    const router = useRouter();
    const onSelectMenu = (value: any) => {
        router.push(value.key)
    }
    return (
        <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={list}
            onSelect={onSelectMenu}
        />
    )
}
export default LeftMenu