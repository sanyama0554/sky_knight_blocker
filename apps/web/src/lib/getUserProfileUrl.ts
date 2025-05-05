import { PROFILE_URL } from '../common/constants';

/**
 * 指定したユーザーIDのプロフィールページURLを取得する
 * @param userId ユーザーID
 * @returns プロフィールページのURL
 */
export function getUserProfileUrl(userId: string): string {
  if (!userId) {
    throw new Error('ユーザーIDが指定されていません');
  }

  return `${PROFILE_URL}/${userId}`;
}
