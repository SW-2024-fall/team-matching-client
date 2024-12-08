import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { WithLocalSvg } from 'react-native-svg/css';
import commentIcon from '@assets/commentIcon.svg';
import likeIcon from '@assets/likeIcon.svg';
import { theme } from '../../../styles/ThemeStyles';

const MeetingItem = ({ item, onPress }) => {
    return (
        <Pressable style={styles.itemContainer} onPress={onPress}>
            <View style={styles.itemContent}>
                <View 
                    style={[
                        styles.imageContainer, 
                        { backgroundColor: item.image ? 'transparent' : theme.colors.grey.light }
                    ]}
                >
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={styles.imageContainer} />
                    ) : (
                        <Text style={styles.placeholderText}>No Image</Text>
                    )}
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.nameFeaturesContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.featuresContainer}>
                            {item.features.map((feature, index) => (
                                <Text key={index} style={styles.itemHashtag}>#{feature}</Text>
                            ))}
                        </View>
                    </View>
                    <Text style={styles.itemPreview} numberOfLines={2}>{item.preview}</Text>
                    <View style={styles.participantsStartEndContainer}>
                        <View style={styles.detailActionContainer}>
                            <View style={styles.detailInfoContainer}>
                                <WithLocalSvg asset={likeIcon} width={14} height={14}/>
                                <Text style={styles.itemLikeCount}>{item.likeCount}</Text>
                            </View>
                            <View style={styles.detailInfoContainer}>
                                <WithLocalSvg asset={commentIcon} width={14} height={14}/>
                                <Text style={styles.itemCommentCount}>{item.commentCount} </Text>
                            </View>
                        </View>
                        <View style={styles.detailInfoContainer}>
                            <Text style={styles.itemCurrentParticipants}>{item.currentParticipants}</Text>
                            <Text style={styles.itemMaxParticipants}> / {item.maxParticipant}명</Text>
                        </View>
                        <View style={styles.detailInfoContainer}>
                            <Text style={styles.itemStartDate}>{item.startDate}</Text>
                            <Text style={styles.itemEndDate}> ~ {item.endDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomColor: theme.colors.grey.light,
        backgroundColor: theme.colors.background.primary,
        marginBottom: 12,
        flexDirection: 'row',
    },
    itemContent: {
        flexDirection: 'row',
        flex: 1,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: theme.colors.grey.border,
        fontWeight: theme.font.weight.primary,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 4,
    },
    nameFeaturesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: theme.font.size.primary,
        fontWeight: `${theme.font.weight.bold}`,
    },
    featuresContainer: {
        flexDirection: 'row',
    },
    itemHashtag: {
        fontSize: theme.font.size.small,
        color: theme.font.color.light,
        marginLeft: 5,
    },
    itemPreview: {
        fontSize: theme.font.size.primary,
        color: theme.font.color.primary,
        marginBottom: 2,
    },
    participantsStartEndContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 4,
    },
    detailActionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
    },
    detailInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 1,
    },
    itemCurrentParticipants: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.primary,
    },
    itemMaxParticipants: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
    },
    itemLikeCount: {
        marginLeft: 4,
        fontSize: theme.font.size.xSmall,
        color: theme.colors.red.primary,
    },
    itemCommentCount: {
        marginLeft: 4,
        fontSize: theme.font.size.xSmall,
        color: theme.colors.blue.primary,
    },
    itemStartDate: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
    },
    itemEndDate: {
        fontSize: theme.font.size.xSmall,
        color: theme.font.color.light,
    },
});

export default MeetingItem;