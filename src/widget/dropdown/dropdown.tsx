import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger
} from '@/components/ui/select'
import { ChevronDownIcon } from '@/components/ui/icon'
import React, { ComponentPropsWithRef } from 'react'
import { Box } from '@/components/ui/box'
import { Option } from '@/src/shared'

export const Dropdown: React.FC<
    {
        items: Option[]
        defaultValue?: string
        onValueChange: (value: string) => void
    } & ComponentPropsWithRef<typeof Box>
> = ({ items, defaultValue, onValueChange, ...rest }) => {
    return (
        <Box {...rest}>
            <Select
                defaultValue={defaultValue || ''}
                onValueChange={onValueChange}
            >
                <SelectTrigger
                    variant="outline"
                    size="lg"
                    className="justify-between items-center"
                >
                    <SelectInput />
                    <SelectIcon as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {items.map((item, index) => (
                            <SelectItem
                                label={item.label}
                                value={item.value}
                                key={index}
                            />
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>
        </Box>
    )
}
