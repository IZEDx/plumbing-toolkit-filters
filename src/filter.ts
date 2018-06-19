
import { Pipe, Sink, MaybePromise, Operator, maybeAwait } from "plumbing-toolkit-core";

export function filter<T>(predicate: (x: T) => MaybePromise<boolean>): Operator<T, T> 
{
    return Pipe.operator( async (value: T, sink: Sink<T>) => {
        if ( await maybeAwait( predicate(value) ) ) {
            sink.next( value );
        }
    });
}
