import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import NotificationSearch from './notification-search'
import { useState } from 'react'

const routes = [
    { key: 'all', title: 'All' },
    { key: 'news', title: 'News' },
    { key: 'activity', title: 'Activity' },
    { key: 'alerts', title: 'Alerts' }
]

const All = (): React.ReactNode => {
    return <NotificationSearch type={'All'} />
}

const News = (): React.ReactNode => {
    return <NotificationSearch type={'News'} />
}

const Activity = (): React.ReactNode => {
    return <NotificationSearch type={'Activity'} />
}

const Alerts = (): React.ReactNode => {
    return <NotificationSearch type={'Alerts'} />
}

const renderScene = SceneMap({
    all: All,
    news: News,
    activity: Activity,
    alerts: Alerts
})

const Notifications = (): React.JSX.Element => {
    const [index, setIndex] = useState(0)
    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props => (
                    <TabBar {...props} style={{ backgroundColor: '#0A2941' }} />
                )}
            />
        </>
    )
}

export default Notifications
