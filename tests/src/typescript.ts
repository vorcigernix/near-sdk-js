import {
    NearBindgen,
    view,
} from 'near-sdk-js'

@NearBindgen({})
class TypeScriptTestContract {
    @view
    bigint() {
        // JSON.stringify cannot seriaize a BigInt, need manually toString
        return (1n + 2n).toString()
    }
}