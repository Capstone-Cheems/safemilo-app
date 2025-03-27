import { News } from '@/src/shared'
import { NewsCard } from '../card'
import { VStack } from '@/components/ui/vstack'
import { Text } from 'react-native'

export const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
    return (
        <>
            <VStack>
                <Text className="text-3xl pl-4 py-4 font-semibold bg-[#DADADA]">
                    News
                </Text>
                {news.map((item, index) => {
                    return <NewsCard news={item} key={index} />
                })}
            </VStack>
        </>
    )
}
