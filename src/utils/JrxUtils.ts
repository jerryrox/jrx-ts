import ArrayUtils from "./ArrayUtils";
import DateUtils from "./DateUtils";
import PromiseUtils from "./PromiseUtils";
import StringUtils from "./StringUtils";

export default class JrxUtils {
    static readonly array = new ArrayUtils();
    static readonly date = new DateUtils();
    static readonly promise = new PromiseUtils();
    static readonly string = new StringUtils();
}