import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import React, {ChangeEvent, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
interface NewTodoInputProps {
    addTodo(todo: string): void;
}

export const NewTodoInput: React.FC<NewTodoInputProps> = ({addTodo}) => {
    const [state, setstate] = useState(' ');
    const [error, setError] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setstate(event.target.value);
        setError(false);
    };

    const onClick = () => {
        if (state === ' ') {
            setError(true);
            return;
        }
        addTodo(state);
        setstate(' ');
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (state === ' ') {
                    setError(true);
                    return;
                }
                onClick();
            }}>
            <FormControl error={error} fullWidth={true}>
                <InputLabel htmlFor="component-error">Title</InputLabel>
                <Input
                    fullWidth={true}
                    value={state}
                    onChange={handleChange}
                    id="component-error"
                    // value={name}
                    aria-describedby="component-error-text"
                />
            </FormControl>
            {/* <TextField
      
        type="text"
        name="tile"
        placeholder="Title"
        required
        label="Standard"
      />
    */}
            <Button
                style={{marginTop: '20px'}}
                variant="outlined"
                color="primary"
                endIcon={<AddIcon />}
                onClick={onClick}>
                Add
            </Button>
        </form>
    );
};
