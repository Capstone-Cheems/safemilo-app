import { Box } from '@/components/ui/box'
import { Switch } from '@/components/ui/switch'
import React, { ComponentPropsWithRef } from 'react'
import { Text } from 'react-native'
import colors from 'tailwindcss/colors'
import { EventHandlerObject } from './types'

export const SwitchWidget: React.FC<
    {
        items: EventHandlerObject[]
    } & ComponentPropsWithRef<typeof Box>
> = ({ items, ...rest }) => {
    return (
        <Box {...rest}>
            {items.map(item => {
                return (
                    <>
                        <Text>{item.label}</Text>
                        <Switch
                            size="md"
                            isDisabled={false}
                            trackColor={{
                                false: colors.neutral[300],
                                true: colors.neutral[600]
                            }}
                            thumbColor={colors.neutral[50]}
                            ios_backgroundColor={colors.neutral[300]}
                            onToggle={item.eventHandler}
                            id={item.id}
                        />
                    </>
                )
            })}
        </Box>
    )
}

export default SwitchWidget
