import { News } from '@/src/shared'
import { NewsCard } from '../card'
import { VStack } from '@/components/ui/vstack'
import { Text } from 'react-native'

export const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
    return (
        <>
            <VStack>
                <Text
                    className="text-3xl pl-4 py-4 pl-6 font-semibold bg-[#DADADA]"
                    style={{
                        fontFamily: 'Montserrat-SemiBold'
                    }}
                >
                    News
                </Text>
                {news.map((item, index) => {
                    return <NewsCard news={item} key={index} />
                })}
            </VStack>
        </>
    )
}
