import { News } from '@/src/shared'
import { NewsCard } from '../card'
import { VStack } from '@/components/ui/vstack'

export const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
    return (
        <>
            <VStack>
                {news.map((item, index) => {
                    return <NewsCard news={item} key={index} />
                })}
            </VStack>
        </>
    )
}
