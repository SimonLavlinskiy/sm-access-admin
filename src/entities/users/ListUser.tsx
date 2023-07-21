import React, {FC} from "react";
import {Device} from "@/entities/devices/utils/types";
import {
    CreateButton, Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    FilterButton,
    FilterForm, FunctionField, List,
    ShowButton, TextField,
    TextInput
} from "react-admin";
import {Stack} from "@mui/material";
import {User} from "@/utils";

const RowActionToolbar: FC<{ record: User }> = ({ record }) => {
    return (
        <div className='flex items-center float-right w-[160px] mt-[-1] mb-[-1] mr-5'>
            <ShowButton label='' record={record} className='min-w-[40px]' />
            <EditButton label='' record={record} className='min-w-[40px]' />
            <DeleteWithConfirmButton
                confirmContent='Вы уверены? Это действие нелья отменить!'
                translateOptions={{ name: record?.username }}
                label=''
                record={record}
                className='flex'
            />
        </div>
    )
}

const ListToolbar = () => {
    return (
        <Stack direction='row' justifyContent='space-between '>
            <FilterForm filters={postFilters} />
            <div className='flex mr-large'>
                <FilterButton filters={postFilters} />
                <CreateButton />
            </div>
        </Stack>
    )
}

const postFilters = [
    <TextInput label="Search" source="name" alwaysOn name='name'/>,
    <TextInput label="Id" source="id" name='id'/>,
];

const ListUser = (props: any) => {

    return (
        <List exporter={false} hasCreate={false}>
            <ListToolbar />
            <Datagrid style={{ overflow: 'user' }}>
                <TextField source='id' label='ID' />
                <TextField source='username' label='Имя пользователя' />
                <TextField source='created_at' label='Дата создания' />
                <TextField source='updated_at' label='Дата обновления' />
                <FunctionField label='' render={(record: User) => <RowActionToolbar record={record} />} />
            </Datagrid>
        </List>
    )
}

export default ListUser