/**
 * @description 
 * @author cq
 * @Date 2019-11-15 18:11:09
 * @LastEditTime 2020-11-17 16:27:58
 * @LastEditors cq
 */
import { Pagination, BaseField } from './common';
import Loading from './Loading';
import AppState, { UserInfo } from './AppState';
import HomeState from './HomeState';
import QuestionListState from "./QuestionList"
import ForumState from "./Forum"

export interface RootState {
	loading: Loading
	app: AppState
	home: HomeState,
	questionList: QuestionListState
	forum:ForumState
}

export {
	// state:
	Loading,
	AppState,
	HomeState,
	UserInfo,
	Pagination,
	BaseField,
	QuestionListState,
	ForumState
}